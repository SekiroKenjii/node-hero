import { inject, injectable } from "inversify";
import { User, TokenPair } from '../../interfaces/contracts'
import {
    SignUpRequest,
    AuthenticationResponse,
    SignInRequest,
    AuthenticationRequest,
    UserResponse,
} from '../../interfaces/http';
import { ApiResult } from '../../../wrappers';
import {
    AuthType,
    DefaultImage,
    Locator,
    StatusCode
} from "../../../constants";
import {
    hashPassword,
    pickFields,
    verifyPassword
} from "../../../utils";
import {
    IAuthService,
    IKeyService,
    ITokenService,
    IUserService
} from "../../interfaces/services";
import {
    ConflictDataException,
    ServerException,
    UnauthorizedException
} from "../../exceptions";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(Locator.USER_SERVICE) private readonly _userService: IUserService,
        @inject(Locator.KEY_SERVICE) private readonly _keyService: IKeyService,
        @inject(Locator.TOKEN_SERVICE) private readonly _tokenService: ITokenService
    ) { }

    async signIn(request: SignInRequest): Promise<ApiResult<AuthenticationResponse>> {
        const existing = await this._userService.repository().findByEmail(request.email);

        if (!existing) {
            throw new UnauthorizedException({
                message: 'Failed to login to your account!',
                errors: ['Incorrect email or password!']
            });
        }

        const checkPassword = await verifyPassword(request.password, existing.password);

        if (!checkPassword) {
            throw new UnauthorizedException({
                message: 'Failed to login to your account!',
                errors: ['Incorrect email or password!']
            });
        }

        return await this.authenticateUser(existing, AuthType.SIGN_IN);
    }

    async signUp(request: SignUpRequest): Promise<ApiResult<AuthenticationResponse>> {
        const existing = await this._userService.repository().findByEmail(request.email);

        if (existing) {
            throw new ConflictDataException({
                message: 'Failed to register new account.',
                errors: ['The email address is already in use by another account.']
            });
        }

        const passwordHash = await hashPassword(request.password);

        const user = await this._userService.createUser({
            full_name: request.fullname,
            email: request.email,
            password: passwordHash,
            phone_number: request.phoneNumber,
            avatar_id: DefaultImage.MALE_AVATAR_ID,
            avatar_url: DefaultImage.MALE_AVATAR
        });

        if (!user) {
            console.log('AuthService.signUp() => Line [76 -> 83]: Failed to create new User Document!');

            throw new ServerException({
                message: 'Failed to register new account.'
            });
        }

        return await this.authenticateUser(user, AuthType.SIGN_UP);
    }

    private async authenticateUser(user: User, authType: string): Promise<ApiResult<AuthenticationResponse>> {
        let errorMessage = '';
        let responseMessage = '';

        switch (authType) {
            case AuthType.SIGN_IN: {
                errorMessage = 'Failed to login to your account!';
                responseMessage = 'Login successfully!';
                break;
            }
            case AuthType.SIGN_UP: {
                errorMessage = 'Failed to register new account.';
                responseMessage = 'Account registration successful!';
                break;
            }
            default: {
                console.log('authenticateUser() => Invalid auth type param.');
                break;
            }
        }

        const userId: string = user._id.toString();

        const keyPair = await this._keyService.generateRandomKeyPair();

        if (!keyPair) {
            console.log('AuthService.authenticateUser() => Line 119: Failed to generate random key pair!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const tokenPair = await this._tokenService.generateJWT({
            payload: {
                userId: userId,
                email: user.email,
                full_name: user.full_name
            },
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        });

        if (!tokenPair) {
            console.log('AuthService.authenticateUser() => Line [129 -> 137]: Failed to generate token pair!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const saveUserKey = await this._keyService.saveUserKey(userId, keyPair, tokenPair);

        if (!saveUserKey) {
            console.log('AuthService.authenticateUser() => Line 147: Failed to save user key!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const responseData: AuthenticationResponse = {
            user: pickFields(user, ['_id', 'full_name', 'email', 'avatar_url']),
            token: tokenPair
        };

        return await ApiResult.successAsync(StatusCode.CREATED, {
            message: responseMessage,
            data: responseData
        });
    }

    async signOut(request?: AuthenticationRequest): Promise<ApiResult<boolean>> {
        if (request === undefined || !request) {
            return await ApiResult.failAsync(StatusCode.UNAUTHORIZED, {
                message: 'Failed to sign out of your account!',
                errors: ['Something went wrong when we tried to sign out of your account.']
            });
        }

        const result = await this._keyService.repository().delete(request.userId);

        return result
            ? await ApiResult.successAsync(StatusCode.OK, {
                message: 'Sign out of your account successfully!',
                data: result
            })
            : await ApiResult.failAsync(StatusCode.UNPROCESSABLE_ENTITY, {
                message: 'Failed to sign out of your account!',
                errors: ['Something went wrong when we tried to sign out of your account.']
            })
    }

    async refreshUserToken(request?: AuthenticationRequest): Promise<ApiResult<AuthenticationResponse>> {
        if (request === undefined || !request) {
            return await ApiResult.failAsync(StatusCode.UNAUTHORIZED, {
                message: 'Failed to refresh user token!',
                errors: ['Something went wrong when we tried to sign out of your account.']
            });
        }

        const { userId, accessToken, refreshToken, publicKey, privateKey } = request;

        const user = await this._userService.repository().findById(userId);

        if (!user) {
            return await ApiResult.failAsync(StatusCode.UNAUTHORIZED, {
                message: 'Failed to refresh user token!',
                errors: ['Something went wrong when we tried to sign out of your account.']
            });
        }

        const userResponse: UserResponse = pickFields(user, ['_id', 'full_name', 'email', 'avatar_url']);

        const tokenPair = await this._tokenService.generateJWT({
            payload: {
                userId: userResponse._id!.toString(),
                email: userResponse.email,
                full_name: userResponse.full_name
            },
            publicKey: publicKey,
            privateKey: privateKey
        });

        if (!tokenPair) {
            console.log('AuthService.refreshUserToken() => Line [210 -> 218]: Failed to generate token pair!');

            throw new ServerException({
                message: 'Failed to refresh user token!'
            });
        }

        const oldTokenPair = {
            accessToken: accessToken,
            refreshToken: refreshToken
        } as TokenPair;

        const updateRefreshToken = await this._keyService.updateUserKeyToken(userId, oldTokenPair, tokenPair);

        if (!updateRefreshToken) {
            console.log('AuthService.refreshUserToken() => Line 233: Failed to update user key!');

            throw new ServerException({
                message: 'Failed to refresh user token!'
            });
        }

        const responseData: AuthenticationResponse = {
            user: userResponse,
            token: tokenPair
        };

        return await ApiResult.successAsync(StatusCode.CREATED, {
            message: 'Refresh your account token successfully!',
            data: responseData
        });
    }
}
