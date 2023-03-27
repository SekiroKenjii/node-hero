import crypto from 'node:crypto'
import { Model } from 'mongoose';
import { Locator } from '../constants/app.constant';
import container from '../core/containers/config.container';
import { ApiKey, Role } from '../core/interfaces/contracts/model.interface';

const apiKeyModel: Model<ApiKey> = container.get<Model<ApiKey>>(Locator.APIKEY_MODEL);
const roleModel: Model<Role> = container.get<Model<Role>>(Locator.ROLE_MODEL);

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

export async function seedRole(): Promise<void> {
    try {
        const numberApiKey = await roleModel.count();

        if (numberApiKey > 0) {
            console.log('Skip Role generation.');
            return;
        }

        await roleModel.insertMany([
            { name: 'Admin', description: '*.*' },
            { name: 'Moderator', description: 'CRU(D)' },
            { name: 'Basic', description: 'Restricted role' }
        ])

        console.log('Role seeded!');
    } catch (error: any) {
        console.log('Failed to seed Role:', error);
    }
}
