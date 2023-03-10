import { ObjectId } from "mongoose";
import { KeyPair } from "../pair.interface";

export interface IKeyService {
    generateUserKeyPair(userId: ObjectId): Promise<KeyPair>;
    generateUserKeyPairAlt(userId: ObjectId): Promise<KeyPair>;
}