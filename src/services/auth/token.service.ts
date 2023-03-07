import jwt from 'jsonwebtoken';
import { TokenPair } from "../../interfaces/pair.interface";
import { Token } from '../../interfaces/token.interface';

class TokenService {
    static async generateJWTToken(request: Token): Promise<TokenPair> {
        const { payload, publicKey, privateKey } = request;

        try {
            const accessToken = await jwt.sign(payload, publicKey, { expiresIn: '2 days' });
            const refreshToken = await jwt.sign(payload, privateKey, { expiresIn: '7 days' });

            jwt.verify(accessToken, publicKey);

            return this.makeTokenPair(accessToken, refreshToken);
        } catch (error) {
            console.log('Failed to generate token:', error);
            throw new Error('Oops, An unhandled error has occurred!');
        }
    }

    static makeTokenPair(accessToken: string, refreshToken: string): TokenPair {
        if (!accessToken || !refreshToken) {
            throw new Error('Failed to generate token pair!');
        }

        return { accessToken, refreshToken };
    }
}

export default TokenService;