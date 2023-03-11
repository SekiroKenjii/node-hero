import { inject, injectable } from "inversify";
import { SignUpRequest } from '../../interfaces/contracts/request.interface'
import { SignUpResponse } from '../../interfaces/contracts/response.interface';
import { ApiResult } from '../../../wrappers/api-result';
import { Locator, Role, StatusCode } from "../../../constants/app.constant";
import { hashPassword } from "../../../utils/data.util";
import { pickFields } from "../../../utils/object.util";
import { IUserRepository } from "../../interfaces/repositories/user.repository.interface";
import { IAuthService } from "../../interfaces/services/auth.service.interface";
import { IKeyService } from "../../interfaces/services/key.service.interface";
import { ITokenService } from "../../interfaces/services/token.service.interface";
import { ConflictDataException, ServerException } from "../../exceptions/app.exception";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(Locator.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(Locator.KeyService) private readonly _keyService: IKeyService,
        @inject(Locator.TokenService) private readonly _tokenService: ITokenService
    ) {}

    async signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>> {
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
            roles: [Role.Basic]
        });

        if (!user) {
            throw new ServerException({
                message: 'Failed to register new account.'
            });
        }

        const keyPair = await this._keyService.generateUserKeyPair(user._id);

        if (!keyPair) {
            throw new ServerException({
                message: 'Failed to register new account.'
            });
        }

        const tokenPair = await this._tokenService.generateJWTToken({
            payload: {
                userId: user._id.toString(),
                email: user.email
            },
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        });

        if (!tokenPair) {
            throw new ServerException({
                message: 'Failed to register new account.'
            });
        }

        const responseData: SignUpResponse = {
            user: pickFields(user, ['_id', 'fullname', 'email']),
            token: tokenPair
        };

        return await ApiResult.successAsync(StatusCode.Created, {
            message: 'Account registration successful!',
            data: responseData
        });
    }
}