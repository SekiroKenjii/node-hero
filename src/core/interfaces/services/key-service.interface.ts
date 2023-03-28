import { KeyPair, TokenPair } from "../contracts";
import { KeyResponse } from '../http';
import { IKeyRepository } from "../repositories";
import { IService } from "./service.interface";

export interface IKeyService extends IService<IKeyRepository> {
    generateRandomKeyPair(): Promise<KeyPair | null>;
    generateRandomKeyPairAlt(): Promise<KeyPair | null>;
    saveUserKey(userId: string, keyPair: KeyPair, tokenPair: TokenPair): Promise<boolean>;
    updateUserKeyToken(userId: string, oldTokenPair: TokenPair, tokenPair: TokenPair): Promise<boolean>;
    getUserKeyByUserId(userId: string): Promise<KeyResponse | null>;
}
