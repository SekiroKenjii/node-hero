import crypto from 'node:crypto'
import ApiKeyModel from "../models/apiKey.model";

export async function seedApiKey(): Promise<void> {
    try {
        const numberApiKey = await ApiKeyModel.count();

        if (numberApiKey > 0) return;

        await ApiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });

        console.log('API Key seeded!');
    } catch(error: any) {
        console.log('Failed to seed API Key:', error);
    }
}
