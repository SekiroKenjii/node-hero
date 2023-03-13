import { ObjectId } from "mongoose";
import { KeyPair } from "../contracts";

export interface IKeyService {
    generateUserKeyPair(userId: ObjectId): Promise<KeyPair | null>;
    generateUserKeyPairAlt(userId: ObjectId): Promise<KeyPair | null>;
}