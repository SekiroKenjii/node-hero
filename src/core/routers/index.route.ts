import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants/app.constant';
import { BaseController } from '../controllers/base.controller';
import { AuthRouter } from './auth.router';

@injectable()
export class IndexRouter {
    private readonly _router: Router;

    constructor(
        @inject(Locator.AuthRouter) private readonly _authRouter: AuthRouter,
        @inject(Locator.BaseController) private readonly _baseController: BaseController
    ) {
        this._router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this._router.use('/auth', this._authRouter.getRouter);
        this._router.post('/example', this._baseController.example);
    }

    getRouter(): Router {
        return this._router;
    }
}