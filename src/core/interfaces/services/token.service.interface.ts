import { TokenPair, Token } from "../contracts";

export interface ITokenService {
    generateJWTToken(request: Token): Promise<TokenPair | null>;
}