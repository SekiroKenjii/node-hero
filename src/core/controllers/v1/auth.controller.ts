import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Locator } from "../../../constants/app.constant";
import { handleResult } from "../../../utils/controller.util";
import { ApiResult } from "../../../wrappers/api-result";
import { SignUpRequest } from "../../interfaces/contracts/request.interface";
import { SignUpResponse } from "../../interfaces/contracts/response.interface";
import { IAuthService } from "../../interfaces/services/auth.service.interface";

@controller('/auth')
export class AuthController {
    constructor(
        @inject(Locator.AuthService) private readonly _authService: IAuthService
    ) {}

    signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const request: SignUpRequest = req.body;
        const result: ApiResult<SignUpResponse> = await this._authService.signUp(request);

        return handleResult(res, result);
    }
}