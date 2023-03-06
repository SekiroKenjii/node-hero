import { config } from 'dotenv';
import { EnvConfig } from "../interfaces/config.interface";

type ProcessEnv = NodeJS.ProcessEnv;

config();

const processEnv: ProcessEnv = process.env;

const dev: EnvConfig = {
    app: {
        port: parseInt(processEnv.DEV_APP_PORT || '3000', 10),
        apiVersion: parseInt(processEnv.API_VERSION || 'v1', 10)
    },
    db: {
        host: processEnv.DEV_DB_HOST || 'localhost',
        port: parseInt(processEnv.DEV_DB_PORT || '27017', 10),
        name: processEnv.DEV_DB_NAME || 'dbDev'
    },
};

const prod: EnvConfig = {
    app: {
        port: parseInt(processEnv.PROD_APP_PORT || '4000', 10),
        apiVersion: parseInt(processEnv.API_VERSION || 'v1', 10)
    },
    db: {
        host: processEnv.PROD_DB_HOST || 'localhost',
        port: parseInt(processEnv.PROD_DB_PORT || '27018', 10),
        name: processEnv.PROD_DB_NAME || 'dbProd'
    },
};

const configs: Record<string, EnvConfig> = { dev, prod };
const env = process.env.NODE_ENV || 'dev';

export default configs[env];