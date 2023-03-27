import { KeyPair, TokenPair } from "../contracts";
import { KeyResponse } from '../http';

export interface IKeyService {
    generateRandomKeyPair(): Promise<KeyPair | null>;
    generateRandomKeyPairAlt(): Promise<KeyPair | null>;
    saveUserKey(userId: string, keyPair: KeyPair, tokenPair: TokenPair): Promise<boolean>;
    updateUserKeyToken(userId: string, oldTokenPair: TokenPair, tokenPair: TokenPair): Promise<boolean>;
    getUserKeyByUserId(userId: string): Promise<KeyResponse | null>;
}
