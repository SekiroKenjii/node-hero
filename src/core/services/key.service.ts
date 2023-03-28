import crypto from 'node:crypto';
import { inject, injectable } from 'inversify';
import { UpdateQuery } from 'mongoose';
import {
    Key,
    KeyPair,
    TokenPair
} from '../interfaces/contracts';
import { KeyResponse } from '../interfaces/http';
import { IKeyService } from '../interfaces/services';
import { Locator } from '../../constants';
import { IKeyRepository } from '../interfaces/repositories';

@injectable()
export class KeyService implements IKeyService {
    constructor(
        @inject(Locator.KEY_REPOSITORY) private readonly _repository: IKeyRepository
    ) { }

    repository(): IKeyRepository {
        return this._repository;
    }

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

    async saveUserKey(userId: string, keyPair: KeyPair, tokenPair: TokenPair): Promise<boolean> {
        const { publicKey, privateKey } = keyPair;

        const update: UpdateQuery<Key> = {
            user: userId,
            public_key: publicKey,
            private_key: privateKey,
            old_refresh_tokens: [],
            access_token: tokenPair.accessToken,
            refresh_token: tokenPair.refreshToken,
        };

        const result = await this._repository.update(userId, update);

        if (!result) {
            console.log('Failed to save user key.');
            return false;
        }

        return true;
    }

    async updateUserKeyToken(userId: string, oldTokenPair: TokenPair, tokenPair: TokenPair): Promise<boolean> {
        const update: UpdateQuery<Key> = {
            access_token: tokenPair.accessToken,
            refresh_token: tokenPair.refreshToken,
            $addToSet: {
                old_refresh_tokens: oldTokenPair.refreshToken
            }
        };

        const result = await this._repository.update(userId, update);

        if (!result) {
            console.log('Failed to save user key.');
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

    async getUserKeyByUserId(userId: string): Promise<KeyResponse | null> {
        const key = await this._repository.findByUserId(userId);

        if (!key) {
            return null;
        }

        return {
            userId: key.user_id.toString(),
            privateKey: key.private_key,
            publicKey: key.public_key,
            accessToken: key.access_token,
            refreshToken: key.refresh_token,
            oldRefreshTokens: key.old_refresh_tokens
        } as KeyResponse
    }
}
