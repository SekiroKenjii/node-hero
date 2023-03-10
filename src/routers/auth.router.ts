import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../constants/app.constant';
import AuthController from '../controllers/v1/auth.controller';

@injectable()
export class AuthRouter {
    private readonly router: Router;

    constructor(@inject(Locator.AuthController) private readonly authController: AuthController) {
        this.router = Router();
        this.authController = authController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/sign-up', this.authController.signUp);
    }

    getRouter() {
        return this.router;
    }
}
