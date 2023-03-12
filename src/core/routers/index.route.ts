import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants/app.constant';
import { exceptionHandler } from '../../middlewares/exception-handler.middleware';
import { ExampleController } from '../controllers/example.controller';
import { AuthRouter } from './auth.router';

@injectable()
export class IndexRouter {
    private readonly _router: Router;

    constructor(
        @inject(Locator.AuthRouter) private readonly _authRouter: AuthRouter,
        @inject(Locator.ExampleController) private readonly _exampleController: ExampleController
    ) {
        this._router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this._router.use('/auth', this._authRouter.getRouter());
        this._router.get('/example', exceptionHandler(this._exampleController.example));
    }

    getRouter(): Router {
        return this._router;
    }
}