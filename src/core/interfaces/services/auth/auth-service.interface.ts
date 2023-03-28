import { ApiResult } from "../../../../wrappers";
import {
    SignUpRequest,
    AuthenticationResponse,
    SignInRequest,
    AuthenticationRequest
} from "../../http";

export interface IAuthService {
    signIn(request: SignInRequest): Promise<ApiResult<AuthenticationResponse>>;
    signUp(request: SignUpRequest): Promise<ApiResult<AuthenticationResponse>>;
    signOut(request?: AuthenticationRequest): Promise<ApiResult<boolean>>;
    refreshUserToken(request?: AuthenticationRequest): Promise<ApiResult<AuthenticationResponse>>
}
