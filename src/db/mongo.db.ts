import { Mongoose } from 'mongoose';
import config from '../configs/environment.config'
import { DbConfig } from '../interfaces/config.interface'
import { Database } from '../interfaces/database.interface';

const dbConfig: DbConfig = config.db;
const CONNECTION_STRING: string = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

class MongoDatabase implements Database<Mongoose> {
    instance: Mongoose;

    constructor(instance: Mongoose) {
        this.instance = instance;
    }

    connect(): void {
        if (process.env.NODE_ENV === 'dev') {
            this.instance.set('debug', true);
            this.instance.set('debug', { color: true });
        }

        this.instance.connect(CONNECTION_STRING, {
            maxPoolSize: 50
        }).then(_ => {
            console.log('Connected Mongodb Successfully!');
        }).catch(error => {
            console.log(`Failed to connect to MongoDb!`, error);
        });
    }
}

export default MongoDatabase;