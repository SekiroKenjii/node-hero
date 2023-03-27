import { Response, NextFunction } from "express";
import {
    AuthenticationResponse,
    AuthenticationRequest,
    Request,
    SignInRequest,
    SignUpRequest
} from '../../interfaces/http';
import { inject, injectable } from "inversify";
import { Locator } from "../../../constants";
import { ApiResult } from "../../../wrappers";
import { IAuthService } from "../../interfaces/services";
import { BaseController } from "../base.controller";

@injectable()
export class AuthController extends BaseController {
    constructor(
        @inject(Locator.AUTH_SERVICE) private readonly _authService: IAuthService
    ) {
        super();
    }

    signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const request: SignInRequest = req.body;
        const result: ApiResult<AuthenticationResponse> = await this._authService.signIn(request);

        return this.handleResult(res, result);
    }

    signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const request: SignUpRequest = req.body;
        const result: ApiResult<AuthenticationResponse> = await this._authService.signUp(request);

        return this.handleResult(res, result);
    }

    signOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authRequest: AuthenticationRequest | undefined = req.authentication ?? undefined;
        const result: ApiResult<boolean> = await this._authService.signOut(authRequest);

        return this.handleResult(res, result);
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const authRequest: AuthenticationRequest | undefined = req.authentication ?? undefined;
        const result: ApiResult<AuthenticationResponse> = await this._authService.refreshUserToken(authRequest);

        return this.handleResult(res, result);
    }
}
