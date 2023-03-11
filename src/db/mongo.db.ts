import mongoose from 'mongoose';
import config from '../configs/environment.config'
import { DbConfig } from '../core/interfaces/contracts/config.interface'

const dbConfig: DbConfig = config.db;
const CONNECTION_STRING: string = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;

async function connectMongoDb(): Promise<void> {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            maxPoolSize: 100,
            connectTimeoutMS: 30000
        });

        console.log('Connected to MongoDB!');
    } catch(error) {
        console.log('Failed to Connect to MongoDB:', error);
        throw new Error('Failed to Connect to MongoDB!');
    }
}

export default connectMongoDb;