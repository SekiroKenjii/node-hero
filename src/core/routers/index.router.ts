import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants';
import RequestHandlerMiddleware, { exceptionHandler } from '../../middlewares';
import { ExampleController } from '../controllers/example.controller';
import { ITokenService } from '../interfaces/services';
import { AuthRouter } from './auth.router';

@injectable()
export class IndexRouter {
    private readonly _router: Router;

    constructor(
        @inject(Locator.TOKEN_SERVICE) private readonly _tokenService: ITokenService,
        @inject(Locator.AUTH_ROUTER) private readonly _authRouter: AuthRouter,
        @inject(Locator.EXAMPLE_CONTROLLER) private readonly _exampleController: ExampleController
    ) {
        this._router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this._router.use('/auth', this._authRouter.getAnonymousRouter());

        const requestHandler = new RequestHandlerMiddleware(this._tokenService);
        this._router.use(exceptionHandler(requestHandler.invoke));

        this._router.use('/auth', this._authRouter.getAuthRouter());
        this._router.get('/example', exceptionHandler(this._exampleController.example));
    }

    public getRouter(): Router {
        return this._router;
    }
}