import { Router } from 'express'
import { inject, injectable } from 'inversify';
import { Locator } from '../../constants';
import { exceptionHandler, RequestHandler } from '../../middlewares';
import { ExampleController } from '../controllers/example.controller';
import { IKeyRepository } from '../interfaces/repositories';
import { AuthRouter } from './auth.router';

@injectable()
export class IndexRouter {
    private readonly _router: Router;

    constructor(
        @inject(Locator.KEY_REPOSITORY) private readonly _keyRepository: IKeyRepository,
        @inject(Locator.AUTH_ROUTER) private readonly _authRouter: AuthRouter,
        @inject(Locator.EXAMPLE_CONTROLLER) private readonly _exampleController: ExampleController
    ) {
        this._router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const authRouter: Router = this._authRouter.getRouter();
        this._router.use('/auth', authRouter);

        this.handleRequest();

        // logout begin

        // logout end.

        this._router.get('/example', exceptionHandler(this._exampleController.example));
    }

    private handleRequest(): void {
        const requestHandler = new RequestHandler(this._keyRepository);
        this._router.use(exceptionHandler(requestHandler.invoke));
    }

    public getRouter(): Router {
        return this._router;
    }
}