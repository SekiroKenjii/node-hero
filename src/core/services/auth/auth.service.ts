import { inject, injectable } from "inversify";
import { SignUpRequest } from '../../interfaces/contracts/request.interface'
import { SignUpResponse } from '../../interfaces/contracts/response.interface';
import { ApiResult } from '../../../wrappers/api-result';
import { Locator, Role } from "../../../constants/app.constant";
import { hashPassword } from "../../../utils/data.util";
import { pickFields } from "../../../utils/object.util";
import { IUserRepository } from "../../interfaces/repositories/user.repository.interface";
import { IAuthService } from "../../interfaces/services/auth.service.interface";
import { IKeyService } from "../../interfaces/services/key.service.interface";
import { ITokenService } from "../../interfaces/services/token.service.interface";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(Locator.UserRepository) private readonly _userRepository: IUserRepository,
        @inject(Locator.KeyService) private readonly _keyService: IKeyService,
        @inject(Locator.TokenService) private readonly _tokenService: ITokenService
    ) {}

    async signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>> {
        try {
            const existing = await this._userRepository.findByEmail(request.email);

            if (existing) {
                return await ApiResult.failAsync({
                    statusCode: 409,
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
                return await ApiResult.failAsync({
                    statusCode: 500,
                    message: 'Failed to register new account.',
                    errors: ['Internal Server Error!']
                });
            }

            const keyPair = await this._keyService.generateUserKeyPair(user._id);

            if (!keyPair) {
                return await ApiResult.failAsync({
                    statusCode: 500,
                    message: 'Failed to register new account.',
                    errors: ['Internal Server Error!']
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
                return await ApiResult.failAsync({
                    statusCode: 500,
                    message: 'Failed to register new account.',
                    errors: ['Internal Server Error!']
                });
            }

            const responseData: SignUpResponse = {
                user: pickFields(user, ['_id', 'fullname', 'email']),
                token: tokenPair
            };

            return await ApiResult.successAsync({
                statusCode: 201,
                message: 'Account registration successful!',
                data: responseData
            });
        } catch(error: any) {
            console.log('Failed to register new account:', error);
            throw new Error('Oops, An unhandled error has occurred!');
        }
    }
}