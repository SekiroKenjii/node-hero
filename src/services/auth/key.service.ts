import crypto from 'node:crypto';
import { ObjectId } from 'mongodb';
import KeyModel from '../../models/key.model';
import { KeyPair } from '../../interfaces/pair.interface';

class KeyService {
    static async generateUserKeyPair(userId: ObjectId): Promise<KeyPair> {
        const publicKeyString = await crypto.randomBytes(64).toString('hex');
        const privateKeyString = await crypto.randomBytes(64).toString('hex');

        const key = await KeyModel.create({
            user: userId,
            publicKey: publicKeyString,
            privateKey: privateKeyString
        });

        if (!key) {
            throw new Error('Failed to generate user key');
        }

        return {
            publicKey: key.publicKey,
            privateKey: key.privateKey
        };
    }

    static async generateUserKeyPairAlt(userId: ObjectId): Promise<KeyPair> {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        });

        try {
            const createdKey = await KeyModel.create({
                user: userId,
                publicKey: publicKey,
                privateKey: privateKey
            });

            const { publicKey: createdPublicKey, privateKey: createdPrivateKey } = createdKey;
            return { publicKey: createdPublicKey, privateKey: createdPrivateKey };
        } catch (error) {
            throw new Error('Failed to generate user key');
        }
    }
}

export default KeyService;