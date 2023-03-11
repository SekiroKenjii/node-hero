import { ObjectId } from "mongoose";
import { KeyPair } from "../contracts/pair.interface";

export interface IKeyService {
    generateUserKeyPair(userId: ObjectId): Promise<KeyPair | null>;
    generateUserKeyPairAlt(userId: ObjectId): Promise<KeyPair | null>;
}