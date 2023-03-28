import { User } from "../contracts";
import { IUserRepository } from "../repositories";
import { IService } from "./service.interface";

export interface IUserService extends IService<IUserRepository> {
    createUser(request: Partial<User>): Promise<User | null>;
}
