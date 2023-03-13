import { ApiResult } from "../../../wrappers";
import { SignUpRequest, SignUpResponse } from "../contracts";

export interface IAuthService {
    signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>>;
}