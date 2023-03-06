import crypto from 'node:crypto'
import apiKeyModel from "../models/apiKey.model";

async function seedApiKey(): Promise<void> {
    try {
        const numberApiKey = await apiKeyModel.count();

        if (numberApiKey > 0) return;

        await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });

        console.log('API Key seeded!');
    } catch(error: any) {
        console.log('Failed to seed API Key:', error);
    }
}

export { seedApiKey };