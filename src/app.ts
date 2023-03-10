import compression from "compression";
import config from './configs/environment.config';
import 'reflect-metadata';
import express, { Application, ErrorRequestHandler } from "express";
import helmet from "helmet";
import mongoDb from "./db/mongo.db";
import { seedApiKey } from "./utils/data.util";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./containers/config.container";
import { Locator } from "./constants/app.constant";
import { IndexRouter } from "./routers/index.route";
import ApiResult from "./wrappers/apiResult";

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
           .send(ApiResult.fail<string>(
                err.status || 500,
                'Internal Server Error!',
                ['Oops, An unhandled error has occurred!'])
            );
    }

    app.use(errorHandler);
});

const app: Application = server.build();

const PORT: number = config.app.port;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});