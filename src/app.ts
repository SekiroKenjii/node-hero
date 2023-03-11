import 'reflect-metadata';
import config from './configs/environment.config';
import mongoDb from "./db/mongo.db";
import express, { Application, ErrorRequestHandler } from "express";
import compression from "compression";
import helmet from "helmet";
import { seedApiKey } from "./utils/data.util";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/containers/config.container";
import { Locator } from "./constants/app.constant";
import { IndexRouter } from "./core/routers/index.route";
import { Request, Response, NextFunction } from 'express';
import { ApiResult } from "./wrappers/api-result";
import { NotFoundException } from './core/exceptions/app.exception';

// Config db
mongoDb();
seedApiKey();

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
        container.get<IndexRouter>(Locator.IndexRouter).getRouter()
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