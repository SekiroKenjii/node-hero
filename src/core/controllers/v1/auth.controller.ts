import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { Locator } from "../../../constants";
import { ApiResult } from "../../../wrappers";
import { SignUpRequest, AuthResponse } from "../../interfaces/contracts";
import { IAuthService } from "../../interfaces/services";
import { BaseController } from "../base.controller";

@injectable()
export class AuthController extends BaseController {
    constructor(
        @inject(Locator.AUTH_SERVICE) private readonly _authService: IAuthService
    ) {
        super();
    }

    signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const request: SignUpRequest = req.body;
        const result: ApiResult<AuthResponse> = await this._authService.signUp(request);

        return this.handleResult(res, result);
    }
}