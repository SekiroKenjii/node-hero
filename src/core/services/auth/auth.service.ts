import { inject, injectable } from "inversify";
import {
    SignUpRequest,
    AuthenticationResponse,
    SignInRequest,
    User,
    AuthenticationRequest,
    UserResponse,
    TokenPair
} from '../../interfaces/contracts'
import { ApiResult } from '../../../wrappers';
import {
    AuthType,
    Locator,
    Role,
    StatusCode
} from "../../../constants";
import {
    hashPassword,
    pickFields,
    verifyPassword
} from "../../../utils";
import { IKeyRepository, IUserRepository } from "../../interfaces/repositories";
import {
    IAuthService,
    IKeyService,
    ITokenService
} from "../../interfaces/services";
import {
    ConflictDataException,
    ServerException,
    UnauthorizedException
} from "../../exceptions";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(Locator.USER_REPOSITORY) private readonly _userRepository: IUserRepository,
        @inject(Locator.KEY_REPOSITORY) private readonly _keyRepository: IKeyRepository,
        @inject(Locator.KEY_SERVICE) private readonly _keyService: IKeyService,
        @inject(Locator.TOKEN_SERVICE) private readonly _tokenService: ITokenService
    ) { }

    async signIn(request: SignInRequest): Promise<ApiResult<AuthenticationResponse>> {
        const existing = await this._userRepository.findByEmail(request.email);

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
        const existing = await this._userRepository.findByEmail(request.email);

        if (existing) {
            throw new ConflictDataException({
                message: 'Failed to register new account.',
                errors: ['The email address is already in use by another account.']
            });
        }

        const passwordHash = await hashPassword(request.password);

        const user = await this._userRepository.create({
            fullname: request.fullname,
            email: request.email,
            password: passwordHash,
            roles: [Role.BASIC]
        });

        if (!user) {
            console.log('AuthService.signUp() => Line [78 -> 83]: Failed to create new User Document!');

            throw new ServerException({
                message: 'Failed to register new account.'
            });
        }

        return await this.authenticateUser(user, AuthType.SIGN_UP);
    }

    private async authenticateUser(user: User, authType: string): Promise<ApiResult<AuthenticationResponse>> {
        let errorMessage = '';
        let responseMessage = '';

        if (authType === AuthType.SIGN_IN) {
            errorMessage = 'Failed to login to your account!';
            responseMessage = 'Login successfully!';
        } else {
            errorMessage = 'Failed to register new account.';
            responseMessage = 'Account registration successful!';
        }

        const userId: string = user._id.toString();

        const keyPair = await this._keyService.generateRandomKeyPair();

        if (!keyPair) {
            console.log('AuthService.authenticateUser() => Line 110: Failed to generate random key pair!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const tokenPair = await this._tokenService.generateJWTToken({
            payload: {
                userId: userId,
                email: user.email,
                fullname: user.fullname
            },
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        });

        if (!tokenPair) {
            console.log('AuthService.authenticateUser() => Line [120 -> 128]: Failed to generate token pair!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const saveUserKey = await this._keyService.saveUserKey(userId, keyPair, tokenPair);

        if (!saveUserKey) {
            console.log('AuthService.authenticateUser() => Line 138: Failed to save user key!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const responseData: AuthenticationResponse = {
            user: pickFields(user, ['_id', 'fullname', 'email']),
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

        const result = await this._keyRepository.delete(request.userId);

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

        const user = await this._userRepository.findById(userId);

        if (!user) {
            return await ApiResult.failAsync(StatusCode.UNAUTHORIZED, {
                message: 'Failed to refresh user token!',
                errors: ['Something went wrong when we tried to sign out of your account.']
            });
        }

        const userResponse: UserResponse = pickFields(user, ['_id', 'fullname', 'email']);

        const tokenPair = await this._tokenService.generateJWTToken({
            payload: {
                userId: userResponse._id!.toString(),
                email: userResponse.email,
                fullname: userResponse.fullname
            },
            publicKey: publicKey,
            privateKey: privateKey
        });

        if (!tokenPair) {
            console.log('AuthService.refreshUserToken() => Line [201 -> 209]: Failed to generate token pair!');

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
            console.log('AuthService.refreshUserToken() => Line 224: Failed to update user key!');

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