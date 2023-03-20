import crypto from 'node:crypto'
import { Model } from 'mongoose';
import { Locator } from '../constants/app.constant';
import container from '../core/containers/config.container';
import { ApiKey } from '../core/interfaces/contracts/model.interface';

const apiKeyModel: Model<ApiKey> = container.get<Model<ApiKey>>(Locator.APIKEY_MODEL);

export async function seedApiKey(): Promise<void> {
    try {
        const numberApiKey = await apiKeyModel.count();

        if (numberApiKey > 0) {
            console.log('Skip API Key generation.');
            return;
        }

        await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });

        console.log('API Key seeded!');
    } catch (error: any) {
        console.log('Failed to seed API Key:', error);
    }
}
