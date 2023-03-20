import { KeyPair } from "../contracts";

export interface IKeyService {
    generateRandomKeyPair(): Promise<KeyPair | null>;
    generateRandomKeyPairAlt(): Promise<KeyPair | null>;
    saveUserKeyPair(userId: string, keyPair: KeyPair, refreshToken: string): Promise<boolean>;
}