import 'reflect-metadata';
import config from './configs/environment.config';
import express, {
    Application,
    ErrorRequestHandler
} from "express";
import compression from "compression";
import helmet from "helmet";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/containers/config.container";
import { Locator } from "./constants";
import { IndexRouter } from "./core/routers";
import {
    Request,
    Response,
    NextFunction
} from 'express';
import { ApiResult } from "./wrappers";
import { NotFoundException } from './core/exceptions';
import { MongoDb } from './db';

// Config db
const mongoDb = container.get<MongoDb>(Locator.MONGO_DB);
mongoDb.seedApiKey();
mongoDb.seedRole();

const server: InversifyExpressServer = new InversifyExpressServer(container);

server.setConfig((app: Application) => {
    // Config Application
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    // Config route
    app.use(
        `/api/v${config.app.apiVersion}`,
        container.get<IndexRouter>(Locator.INDEX_ROUTER).getRouter()
    );
});

server.setErrorConfig((app: Application) => {
    // Handle Route NotFound
    app.use((req: Request, res: Response, next: NextFunction) => {
        const notFound: NotFoundException = new NotFoundException({
            message: 'Not Found!',
            errors: ['Route is not defined!']
        });

        return res.status(notFound.statusCode).send(ApiResult.fail<string>(notFound.statusCode, {
            message: notFound.message,
            errors: notFound.errors
        }));
    });

    // Handle Unhandled Error
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        const statusCode = err.statusCode || 500;

        res.status(statusCode).send(ApiResult.fail<string>(statusCode, {
            message: err.message || 'Oops, An unhandled error has occurred!',
            errors: !err.errors ? ['Internal Server Error!'] : err.errors
        }));
    }

    app.use(errorHandler);
});

const app: Application = server.build();

const PORT: number = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
