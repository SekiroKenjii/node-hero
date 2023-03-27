import { Key } from "../contracts";
import { IRepository } from "./repository.interface";

export interface IKeyRepository extends IRepository<Key> {
    findByUserId(userId: string): Promise<Key | null>;
}