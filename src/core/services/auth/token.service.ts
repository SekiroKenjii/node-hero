import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { TokenPair } from "../../interfaces/contracts/pair.interface";
import { ITokenService } from '../../interfaces/services/token.service.interface';
import { Token } from '../../interfaces/contracts/token.interface';

@injectable()
export class TokenService implements ITokenService {
    async generateJWTToken(request: Token): Promise<TokenPair | null> {
        const { payload, publicKey, privateKey } = request;

        const accessToken = await jwt.sign(payload, publicKey, { expiresIn: '2 days' });
        const refreshToken = await jwt.sign(payload, privateKey, { expiresIn: '7 days' });

        const verifyAccessToken = this.verifyAccessToken(accessToken, publicKey);

        if (!verifyAccessToken) {
            console.log('Failed to generate token.');
            return null;
        }

        return this.makeTokenPair(accessToken, refreshToken);
    }

    private verifyAccessToken(accessToken: string, publicKey: string): boolean {
        const verifyAccessToken = jwt.verify(accessToken, publicKey);

        return verifyAccessToken ? true : false;
    }

    private makeTokenPair(accessToken: string, refreshToken: string): TokenPair | null {
        if (!accessToken || !refreshToken) {
            return null;
        }

        return { accessToken, refreshToken };
    }
}