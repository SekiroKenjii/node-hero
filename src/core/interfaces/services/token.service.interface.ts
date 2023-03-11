import { TokenPair } from "../contracts/pair.interface";
import { Token } from "../contracts/token.interface";

export interface ITokenService {
    generateJWTToken(request: Token): Promise<TokenPair | null>;
}