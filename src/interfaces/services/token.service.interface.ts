import { TokenPair } from "../pair.interface";
import { Token } from "../token.interface";

export interface ITokenService {
    generateJWTToken(request: Token): Promise<TokenPair>;
}