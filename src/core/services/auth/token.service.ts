import { inject, injectable } from 'inversify';
import jwt, {
    JsonWebTokenError,
    TokenExpiredError
} from 'jsonwebtoken';
import { Locator } from '../../../constants';
import {
    Payload,
    Token,
    TokenPair
} from "../../interfaces/contracts";
import { AuthenticationRequest } from '../../interfaces/http';
import { IKeyService, ITokenService } from '../../interfaces/services';

@injectable()
export class TokenService implements ITokenService {
    constructor(
        @inject(Locator.KEY_SERVICE) private readonly _keyService: IKeyService
    ) { }

    async generateJWT(request: Token): Promise<TokenPair | null> {
        const { payload, publicKey, privateKey } = request;

        const accessToken = await jwt.sign(payload, publicKey, { expiresIn: '30m' });
        const refreshToken = await jwt.sign(payload, privateKey, { expiresIn: '7 days' });

        try {
            jwt.verify(accessToken, publicKey);
        } catch (error: any) {
            console.log('Failed to generate token:', error);
            return null;
        }

        return this.makeTokenPair(accessToken, refreshToken);
    }

    private makeTokenPair(accessToken: string, refreshToken: string): TokenPair | null {
        if (!accessToken || !refreshToken) {
            return null;
        }

        return { accessToken, refreshToken } as TokenPair;
    }

    async verifyAccessToken(userId: string, accessToken: string): Promise<void> {
        const message = 'Invalid Authentication or JWT malformed.';
        const key = await this._keyService.getUserKeyByUserId(userId);

        if (!key || key.accessToken !== accessToken) {
            throw new Error(message);
        }

        jwt.verify(accessToken, key.publicKey, (error: any, decoded: any) => {
            switch (error) {
                case error instanceof TokenExpiredError: {
                    return;
                }
                case error instanceof JsonWebTokenError: {
                    throw new Error(message);
                }
                default: {
                    break;
                }
            }

            if (typeof decoded === 'string' || decoded === undefined || !decoded) {
                throw new Error(message);
            }
        });
    }

    async verifyRefreshToken(userId: string, refreshToken: string): Promise<AuthenticationRequest> {
        return new Promise(async (resolve, reject) => {
            const expiredMsg = 'Invalid Authentication or token has expired.';
            const invalidMsg = 'Invalid Authentication or JWT malformed.';
            const key = await this._keyService.getUserKeyByUserId(userId);

            if (!key) {
                reject(new Error(invalidMsg));
                return;
            }

            if (key.oldRefreshTokens.includes(refreshToken) || key.refreshToken !== refreshToken) {
                // @todo - notify property auth user -> someone is trying to log into this account
                this._keyService.repository().delete(userId);
                reject(new Error(expiredMsg));
                return;
            }

            jwt.verify(refreshToken, key.privateKey, async (error: any, decoded: any) => {
                switch (error) {
                    case error instanceof TokenExpiredError: {
                        reject(new Error(expiredMsg));
                        return;
                    }
                    case error instanceof JsonWebTokenError: {
                        reject(new Error(invalidMsg));
                        return;
                    }
                    default: {
                        break;
                    }
                }

                if (typeof decoded === 'string' || decoded === undefined || !decoded) {
                    reject(new Error(invalidMsg));
                    return;
                }

                resolve({
                    userId: (decoded as Payload).userId,
                    privateKey: key.privateKey,
                    publicKey: key.publicKey
                } as AuthenticationRequest);
            });
        });
    }
}
