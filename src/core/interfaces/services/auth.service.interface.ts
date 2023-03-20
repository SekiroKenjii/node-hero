import { ApiResult } from "../../../wrappers";
import { SignUpRequest, AuthResponse, SignInRequest } from "../contracts";

export interface IAuthService {
    signIn(request: SignInRequest): Promise<ApiResult<AuthResponse>>;
    signUp(request: SignUpRequest): Promise<ApiResult<AuthResponse>>;
}