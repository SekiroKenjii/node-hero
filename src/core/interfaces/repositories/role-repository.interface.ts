import { Role } from "../contracts";
import { IRepository } from "./repository.interface";

export interface IRoleRepository extends IRepository<Role> {
    findByName(roleName: string): Promise<Role | null>;
}
