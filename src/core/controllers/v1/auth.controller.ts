import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { Locator } from "../../../constants/app.constant";
import { ApiResult } from "../../../wrappers/api-result";
import { SignUpRequest } from "../../interfaces/contracts/request.interface";
import { SignUpResponse } from "../../interfaces/contracts/response.interface";
import { IAuthService } from "../../interfaces/services/auth.service.interface";
import { BaseController } from "../base.controller";

@injectable()
export class AuthController extends BaseController {
    constructor(
        @inject(Locator.AuthService) private readonly _authService: IAuthService
    ) {
        super();
    }

    signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const request: SignUpRequest = req.body;
        const result: ApiResult<SignUpResponse> = await this._authService.signUp(request);

        return this.handleResult(res, result);
    }
}