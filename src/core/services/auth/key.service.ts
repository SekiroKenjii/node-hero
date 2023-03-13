import crypto from 'node:crypto';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongoose';
import { KeyPair } from '../../interfaces/contracts';
import { IKeyService } from '../../interfaces/services';
import { Locator } from '../../../constants';
import { IKeyRepository } from '../../interfaces/repositories';

@injectable()
export class KeyService implements IKeyService {
    constructor(@inject(Locator.KeyRepository) readonly _keyRepository: IKeyRepository) { }

    async generateUserKeyPair(userId: ObjectId): Promise<KeyPair | null> {
        const publicKeyString = await crypto.randomBytes(64).toString('hex');
        const privateKeyString = await crypto.randomBytes(64).toString('hex');

        const createdKey = await this._keyRepository.create({
            user: userId,
            publicKey: publicKeyString,
            privateKey: privateKeyString
        });

        if (!createdKey) {
            console.log('Failed to generate user key.');
            return null;
        }

        return {
            publicKey: createdKey.publicKey,
            privateKey: createdKey.privateKey
        };
    }

    async generateUserKeyPairAlt(userId: ObjectId): Promise<KeyPair | null> {
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

        const createdKey = await this._keyRepository.create({
            user: userId,
            publicKey: publicKey,
            privateKey: privateKey
        });

        if (!createdKey) {
            console.log('Failed to generate user key!');
            return null;
        }

        return {
            publicKey: createdKey.publicKey,
            privateKey: createdKey.privateKey
        };
    }
}