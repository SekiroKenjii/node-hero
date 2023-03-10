import { User } from "../../model.interface";
import { IBaseRepository } from "../base.repository.interface";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}