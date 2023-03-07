import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import config from '../configs/environment.config'
import { DbConfig } from '../interfaces/config.interface'

const dbConfig: DbConfig = config.db;
const CONNECTION_STRING: string = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

async function connectMongoDb(): Promise<Db> {
    try {
        const options: MongoClientOptions = {
            maxPoolSize: 50
        };
        const client = await MongoClient.connect(CONNECTION_STRING, options);
        console.log('Connected to MongoDB!');

        return client.db();
    } catch(error) {
        console.log('Failed to Connect to MongoDB:', error);
        throw new Error('Failed to Connect to MongoDB!');
    }
}

export default connectMongoDb;