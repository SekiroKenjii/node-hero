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
import { ApiResult } from "./wrappers/api-result";

// Config db
mongoDb();
seedApiKey();

const server: InversifyExpressServer = new InversifyExpressServer(container, null, {
    rootPath: `/api/v${config.app.apiVersion}`
});

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
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        res.status(err.status || 500)
           .send(ApiResult.fail<string>({
                statusCode: err.status || 500,
                message: err.message
            }));
    }

    app.use(errorHandler);
});

const app: Application = server.build();

const PORT: number = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});