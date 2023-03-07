import compression from "compression";
import config from './configs/environment.config';
import express, { Application, ErrorRequestHandler } from "express";
import helmet from "helmet";
import { Server } from "http";
import mongoDb from "./db/mongo.db";
import indexRoute from "./routes/index.route";
import { seedApiKey } from "./utils/data.util";

const app: Application = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Config db
mongoDb();
seedApiKey();

// Config route
app.use(`/api/v${config.app.apiVersion}`, indexRoute);

// Handle Error
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).send('Oops, An unhandled error has occurred!');
}

app.use(errorHandler);

const PORT: number = config.app.port;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});