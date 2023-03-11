import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants/app.constant';
import { exceptionHandler } from '../../middlewares/exception-handler.middleware';
import { AuthController } from '../controllers/v1/auth.controller';

@injectable()
export class AuthRouter {
    private readonly _router: Router;

    constructor(@inject(Locator.AuthController) private readonly _authController: AuthController) {
        this._router = Router();

        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this._router.post('/sign-up', exceptionHandler(this._authController.signUp));
    }

    getRouter(): Router {
        return this._router;
    }
}
