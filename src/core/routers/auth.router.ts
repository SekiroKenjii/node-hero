import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants';
import { exceptionHandler } from '../../middlewares';
import { AuthController } from '../controllers/v1';

@injectable()
export class AuthRouter {
    private readonly _anonymousRouter: Router;
    private readonly _authRouter: Router;

    constructor(
        @inject(Locator.AUTH_CONTROLLER) private readonly _authController: AuthController
    ) {
        this._anonymousRouter = Router();
        this._authRouter = Router();
    }

    private async initializeAnonymousRoutes(): Promise<void> {
        this._anonymousRouter.post('/sign-in', exceptionHandler(this._authController.signIn));
        this._anonymousRouter.post('/sign-up', exceptionHandler(this._authController.signUp));
    }

    private async initializeAuthRoutes(): Promise<void> {
        this._authRouter.post('/sign-out', exceptionHandler(this._authController.signOut));
        this._authRouter.post('/refresh-token', exceptionHandler(this._authController.refreshToken));
    }

    public getAnonymousRouter(): Router {
        this.initializeAnonymousRoutes();
        return this._anonymousRouter;
    }

    public getAuthRouter(): Router {
        this.initializeAuthRoutes();
        return this._authRouter;
    }
}
