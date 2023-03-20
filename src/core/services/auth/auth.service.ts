import { inject, injectable } from "inversify";
import {
    SignUpRequest,
    AuthResponse,
    SignInRequest,
    User
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
import { IUserRepository } from "../../interfaces/repositories";
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
        @inject(Locator.KEY_SERVICE) private readonly _keyService: IKeyService,
        @inject(Locator.TOKEN_SERVICE) private readonly _tokenService: ITokenService
    ) { }

    async signIn(request: SignInRequest): Promise<ApiResult<AuthResponse>> {
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

    async signUp(request: SignUpRequest): Promise<ApiResult<AuthResponse>> {
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
            console.log('AuthService.signUp() => Line [74 -> 79]: Failed to create new User Document!');

            throw new ServerException({
                message: 'Failed to register new account.'
            });
        }

        return await this.authenticateUser(user, AuthType.SIGN_UP);
    }

    private async authenticateUser(user: User, authType: string): Promise<ApiResult<AuthResponse>> {
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
            console.log('AuthService.authenticateUser() => Line 106: Failed to generate random key pair!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const tokenPair = await this._tokenService.generateJWTToken({
            payload: {
                userId: userId,
                email: user.email
            },
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        });

        if (!tokenPair) {
            console.log('AuthService.authenticateUser() => Line [116 -> 123]: Failed to generate token pair!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const saveUserKey = await this._keyService.saveUserKeyPair(userId, keyPair, tokenPair.refreshToken);

        if (!saveUserKey) {
            console.log('AuthService.authenticateUser() => Line 133: Failed to save user key!');

            throw new ServerException({
                message: errorMessage
            });
        }

        const responseData: AuthResponse = {
            user: pickFields(user, ['_id', 'fullname', 'email']),
            token: tokenPair
        };

        return await ApiResult.successAsync(StatusCode.CREATED, {
            message: responseMessage,
            data: responseData
        });
    }
}