import bcrypt from "bcrypt";
import crypto from 'node:crypto'
import { Model } from 'mongoose';
import { Locator } from '../constants/app.constant';
import container from '../core/containers/config.container';
import { ApiKey } from '../core/interfaces/contracts/model.interface';

const ApiKeyModel: Model<ApiKey> = container.get<Model<ApiKey>>(Locator.ApiKeyModel);

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

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}
