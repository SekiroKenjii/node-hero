import { User } from "../contracts";
import { IRepository } from "./repository.interface";

export interface IUserRepository extends IRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}