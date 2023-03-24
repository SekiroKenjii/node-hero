import {
    TokenPair,
    Token,
    AuthenticationRequest
} from "../contracts";

export interface ITokenService {
    generateJWT(request: Token): Promise<TokenPair | null>;
    verifyAccessToken(userId: string, accessToken: string): Promise<AuthenticationRequest | null>;
    verifyRefreshToken(userId: string, refreshToken: string): Promise<AuthenticationRequest>;
}
