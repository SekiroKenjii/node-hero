import crypto from 'node:crypto';
import { inject, injectable } from 'inversify';
import { UpdateQuery } from 'mongoose';
import { Key, KeyPair } from '../../interfaces/contracts';
import { IKeyService } from '../../interfaces/services';
import { Locator } from '../../../constants';
import { IKeyRepository } from '../../interfaces/repositories';

@injectable()
export class KeyService implements IKeyService {
    constructor(
        @inject(Locator.KEY_REPOSITORY) readonly _keyRepository: IKeyRepository
    ) { }

    async generateRandomKeyPair(): Promise<KeyPair | null> {
        const publicKeyString = await crypto.randomBytes(64).toString('hex');
        const privateKeyString = await crypto.randomBytes(64).toString('hex');

        return this.makeKeyPair(publicKeyString, privateKeyString);
    }

    async generateRandomKeyPairAlt(): Promise<KeyPair | null> {
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

        return this.makeKeyPair(publicKey, privateKey);
    }

    async saveUserKeyPair(userId: string, keyPair: KeyPair, refreshToken: string): Promise<boolean> {
        const { publicKey, privateKey } = keyPair;

        const update: UpdateQuery<Key> = {
            publicKey: publicKey,
            privateKey: privateKey,
            oldRefreshTokens: [],
            refreshToken: refreshToken
        };

        const result = await this._keyRepository.update(userId, update);

        if (!result) {
            console.log('Failed to generate user key.');
            return false;
        }

        return true;
    }

    private makeKeyPair(publicKey: string, privateKey: string): KeyPair | null {
        if (!publicKey || !privateKey) {
            return null;
        }

        return {
            publicKey: publicKey,
            privateKey: privateKey
        };
    }
}