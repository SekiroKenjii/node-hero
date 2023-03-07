import bcrypt from "bcrypt";
import { SignUpRequest } from '../../interfaces/request.interface'
import { SignUpResponse } from '../../interfaces/response.interface';
import ApiResult from '../../wrappers/apiResult';
import UserModel from '../../models/user.model';
import { ROLE } from "../../constants/app.constant";
import KeyService from "./key.service";
import TokenService from "./token.service";
import { pickFields } from "../../utils/object.util";

class AuthService {
    static async signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>> {
        try {
            const cursor = await UserModel.findOne({ email: request.email }).lean();

            if (cursor) {
                return await ApiResult.failAsync(
                    400,
                    'Failed to register new account!',
                    ['The email address is already in use by another account']
                );
            }

            const passwordHash = await bcrypt.hash(request.password, 10);

            const user = await UserModel.create({
                fullname: request.fullname,
                email: request.email,
                password: passwordHash,
                roles: [ROLE.BASIC]
            });

            if (!user) {
                throw new Error('Failed to register new account!');
            }

            const keyPair = await KeyService.generateUserKeyPair(user._id);
            const tokenPair = await TokenService.generateJWTToken({
                payload: {
                    userId: user._id,
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