import { Model } from 'mongoose';
import crypto from 'node:crypto'
import { Locator } from '../constants/app.constant';
import container from '../containers/config.container';
import { ApiKey } from '../interfaces/model.interface';

const ApiKeyModel = container.get<Model<ApiKey>>(Locator.ApiKeyModel);

export async function seedApiKey(): Promise<void> {
    try {
        const numberApiKey = await ApiKeyModel.count();

        if (numberApiKey > 0) {
            console.log('Skip API Key generation.');
            return;
        }

        await ApiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });

        console.log('API Key seeded!');
    } catch(error: any) {
        console.log('Failed to seed API Key:', error);
    }
}
