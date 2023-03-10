import ApiResult from "../../wrappers/apiResult";
import { SignUpRequest } from "../request.interface";
import { SignUpResponse } from "../response.interface";

export interface IAuthService {
    signUp(request: SignUpRequest): Promise<ApiResult<SignUpResponse>>;
}