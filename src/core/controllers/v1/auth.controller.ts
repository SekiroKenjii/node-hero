import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { Locator } from "../../../constants/app.constant";
import { SignUpRequest } from "../../interfaces/contracts/request.interface";
import { IAuthService } from "../../interfaces/services/auth.service.interface";
import { BaseController } from "../base.controller";

@controller('auth')
export class AuthController extends BaseController {
    constructor(@inject(Locator.AuthService) private authService: IAuthService) {
        super();
    }

    @httpPost('sign-up')
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const request: SignUpRequest = req.body;
            return this.handleResult(await this.authService.signUp(request));
        } catch(error: any) {
            next(error);
        }
    }
}