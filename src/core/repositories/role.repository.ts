import { BaseRepository } from "./base.repository";
import { Role } from '../interfaces/contracts';
import { IRoleRepository } from "../interfaces/repositories";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { Locator } from "../../constants";

@injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
    constructor(
        @inject(Locator.ROLE_MODEL) readonly roleModel: Model<Role>
    ) {
        super(roleModel);
    }

    async findByName(roleName: string): Promise<Role | null> {
        return await this.findFirst({ name: roleName });
    }
}
