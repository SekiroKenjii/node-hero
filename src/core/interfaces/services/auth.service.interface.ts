import { ApiResult } from "../../../wrappers/api-result";
import { SignUpRequest } from "../contracts/request.interface";
import { SignUpResponse } from "../contracts/response.interface";

export interface IAuthService {
    signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>>;
}