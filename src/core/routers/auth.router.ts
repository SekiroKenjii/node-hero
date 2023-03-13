import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants';
import { exceptionHandler } from '../../middlewares';
import { AuthController } from '../controllers/v1';

@injectable()
export class AuthRouter {
    private readonly _router: Router;

    constructor(
        @inject(Locator.AuthController) private readonly _authController: AuthController
    ) {
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
