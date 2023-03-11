import crypto from 'node:crypto';
import { inject, injectable } from 'inversify';
import { ObjectId } from 'mongoose';
import { KeyPair } from '../../interfaces/contracts/pair.interface';
import { IKeyService } from '../../interfaces/services/key.service.interface';
import { Locator } from '../../../constants/app.constant';
import { IKeyRepository } from '../../interfaces/repositories/key.repository';

@injectable()
export class KeyService implements IKeyService {
    constructor(@inject(Locator.KeyRepository) readonly _keyRepository: IKeyRepository) {}

    async generateUserKeyPair(userId: ObjectId): Promise<KeyPair | null> {
        const publicKeyString = await crypto.randomBytes(64).toString('hex');
        const privateKeyString = await crypto.randomBytes(64).toString('hex');

        try {
            const createdKey = await this._keyRepository.create({
                user: userId,
                publicKey: publicKeyString,
                privateKey: privateKeyString
            });

            if (!createdKey) {
                return null;
            }

            return {
                publicKey: createdKey.publicKey,
                privateKey: createdKey.privateKey
            };
        } catch (error: any) {
            console.log('Failed to generate user key:', error);
            throw new Error('Oops, An unhandled error has occurred!');
        }
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

        try {
            const createdKey = await this._keyRepository.create({
                user: userId,
                publicKey: publicKey,
                privateKey: privateKey
            });

            if (!createdKey) {
                return null;
            }

            return {
                publicKey: createdKey.publicKey,
                privateKey: createdKey.privateKey
            };
        } catch (error: any) {
            console.log('Failed to generate user key:', error);
            throw new Error('Oops, An unhandled error has occurred!');
        }
    }
}