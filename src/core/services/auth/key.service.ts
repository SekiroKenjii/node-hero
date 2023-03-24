import crypto from 'node:crypto';
import { inject, injectable } from 'inversify';
import { UpdateQuery } from 'mongoose';
import {
    Key,
    KeyPair,
    KeyResponse,
    TokenPair
} from '../../interfaces/contracts';
import { IKeyService } from '../../interfaces/services';
import { Locator } from '../../../constants';
import { IKeyRepository } from '../../interfaces/repositories';

@injectable()
export class KeyService implements IKeyService {
    constructor(
        @inject(Locator.KEY_REPOSITORY) private readonly _keyRepository: IKeyRepository
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

    async saveUserKey(userId: string, keyPair: KeyPair, tokenPair: TokenPair): Promise<boolean> {
        const { publicKey, privateKey } = keyPair;

        const update: UpdateQuery<Key> = {
            user: userId,
            publicKey: publicKey,
            privateKey: privateKey,
            oldRefreshTokens: [],
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
        };

        const result = await this._keyRepository.update(userId, update);

        if (!result) {
            console.log('Failed to save user key.');
            return false;
        }

        return true;
    }

    async updateUserKeyToken(userId: string, oldTokenPair: TokenPair, tokenPair: TokenPair): Promise<boolean> {
        const update: UpdateQuery<Key> = {
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
            $addToSet: {
                oldRefreshTokens: oldTokenPair.refreshToken
            }
        };

        const result = await this._keyRepository.update(userId, update);

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
        const key = await this._keyRepository.findByUserId(userId);

        if (!key) {
            return null;
        }

        return {
            userId: key.user.toString(),
            privateKey: key.privateKey,
            publicKey: key.publicKey,
            accessToken: key.accessToken,
            refreshToken: key.refreshToken,
            oldRefreshTokens: key.oldRefreshTokens
        } as KeyResponse
    }
}
