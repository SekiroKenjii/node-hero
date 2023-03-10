import crypto from 'node:crypto';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongoose';
import { KeyPair } from '../../interfaces/pair.interface';
import { IKeyService } from '../../interfaces/services/key.service.interface';
import { Locator } from '../../constants/app.constant';
import { IKeyRepository } from '../../interfaces/repositories/catalog/key.repository.interface';

@injectable()
class KeyService implements IKeyService {
    constructor(@inject(Locator.KeyRepository) readonly keyRepository: IKeyRepository) {}

    async generateUserKeyPair(userId: ObjectId): Promise<KeyPair> {
        const publicKeyString = await crypto.randomBytes(64).toString('hex');
        const privateKeyString = await crypto.randomBytes(64).toString('hex');

        const key = await this.keyRepository.create({
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

    async generateUserKeyPairAlt(userId: ObjectId): Promise<KeyPair> {
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
            const createdKey = await this.keyRepository.create({
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