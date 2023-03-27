import { BaseRepository } from "./base.repository";
import { Role } from '../interfaces/contracts';
import { IRoleRepository } from "../interfaces/repositories";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { Locator } from "../../constants";

@injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
    constructor(
        @inject(Locator.ROLE_MODEL) private readonly _roleModel: Model<Role>
    ) {
        super(_roleModel);
    }
}
