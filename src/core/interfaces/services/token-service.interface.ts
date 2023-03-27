import { TokenPair, Token } from "../contracts";
import { AuthenticationRequest } from '../http';

export interface ITokenService {
    generateJWT(request: Token): Promise<TokenPair | null>;
    verifyAccessToken(userId: string, accessToken: string): Promise<void>;
    verifyRefreshToken(userId: string, refreshToken: string): Promise<AuthenticationRequest>;
}
