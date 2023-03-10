import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../constants/app.constant';
import BaseController from '../controllers/v1/auth.controller';
import { AuthRouter } from './auth.router';

@injectable()
export class IndexRouter {
    private readonly router: Router;

    constructor(
        @inject(Locator.AuthRouter) private readonly authRouter: AuthRouter,
        @inject(Locator.BaseController) private readonly baseController: BaseController
    ) {
        this.router = Router();
        this.baseController = baseController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.use('/auth', this.authRouter.getRouter);
        this.router.post('/example', this.baseController.example);
    }

    getRouter() {
        return this.router;
    }
}