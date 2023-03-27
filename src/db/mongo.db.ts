import crypto from 'node:crypto'
import { inject, injectable } from 'inversify';
import mongoose, { Model } from 'mongoose';
import config from '../configs/environment.config'
import { Locator } from '../constants';
import { ApiKey, DbConfig, Role } from '../core/interfaces/contracts'

@injectable()
export class MongoDb {
    private readonly _config: DbConfig;
    private readonly _connectionString: string;

    constructor(
        @inject(Locator.APIKEY_MODEL) private readonly _apiKeyModel: Model<ApiKey>,
        @inject(Locator.ROLE_MODEL) private readonly _roleModel: Model<Role>
    ) {
        this._config = config.db;
        this._connectionString = `mongodb://${this._config.host}:${this._config.port}/${this._config.name}`;
        this.connect();
    }

    private async connect(): Promise<void> {
        try {
            await mongoose.connect(this._connectionString, {
                maxPoolSize: 100,
                connectTimeoutMS: 30000,
                authSource: 'admin',
                user: this._config.user_name,
                pass: this._config.password,
            });

            console.log('Connected to MongoDB!');
        } catch (error) {
            console.log('Failed to Connect to MongoDB:', error);
            throw new Error('Failed to Connect to MongoDB!');
        }
    }

    async seedApiKey(): Promise<void> {
        try {
            const numberApiKey = await this._apiKeyModel.count();

            if (numberApiKey > 0) {
                console.log('Skip API Key generation.');
                return;
            }

            await this._apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });

            console.log('API Key seeded!');
        } catch (error: any) {
            console.log('Failed to seed API Key:', error);
        }
    }

    async seedRole(): Promise<void> {
        try {
            const numberApiKey = await this._roleModel.count();

            if (numberApiKey > 0) {
                console.log('Skip Role generation.');
                return;
            }

            await this._roleModel.insertMany([
                { name: 'Admin', description: '*.*' },
                { name: 'Moderator', description: 'CRU(D)' },
                { name: 'Basic', description: 'Restricted role' }
            ])

            console.log('Role seeded!');
        } catch (error: any) {
            console.log('Failed to seed Role:', error);
        }
    }
}
