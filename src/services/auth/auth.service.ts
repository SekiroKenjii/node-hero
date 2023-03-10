import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { SignUpRequest } from '../../interfaces/request.interface'
import { SignUpResponse } from '../../interfaces/response.interface';
import ApiResult from '../../wrappers/apiResult';
import { Locator, Role } from "../../constants/app.constant";
import { pickFields } from "../../utils/object.util";
import { IUserRepository } from "../../interfaces/repositories/catalog/user.repository.interface";
import { IAuthService } from "../../interfaces/services/auth.service.interface";
import { IKeyService } from "../../interfaces/services/key.service.interface";
import { ITokenService } from "../../interfaces/services/token.service.interface";

@injectable()
class AuthService implements IAuthService {
    constructor(
        @inject(Locator.UserRepository) private userRepository: IUserRepository,
        @inject(Locator.KeyService) private keyService: IKeyService,
        @inject(Locator.TokenService) private tokenService: ITokenService
    ) {}

    async signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>> {
        try {
            const existing = await this.userRepository.findByEmail(request.email);

            if (existing) {
                return await ApiResult.failAsync(
                    400,
                    'Failed to register new account!',
                    ['The email address is already in use by another account']
                );
            }

            const passwordHash = await bcrypt.hash(request.password, 10);

            const user = await this.userRepository.create({
                fullname: request.fullname,
                email: request.email,
                password: passwordHash,
                roles: [Role.Basic]
            });

            if (!user) {
                throw new Error('Failed to register new account!');
            }

            const keyPair = await this.keyService.generateUserKeyPair(user._id);
            const tokenPair = await this.tokenService.generateJWTToken({
                payload: {
                    userId: user._id.toString(),
                    email: user.email
                },
                publicKey: keyPair.publicKey,
                privateKey: keyPair.privateKey
            });

            const responseData: SignUpResponse = {
                user: pickFields(user, ['_id', 'fullname', 'email']),
                token: tokenPair
            };

            return await ApiResult.successAsync(201, 'Account registration successful!', responseData);
        } catch(error: any) {
            console.log('Failed to register new account:', error);
            throw new Error('Oops, An unhandled error has occurred!');
        }
    }
}

export default AuthService;