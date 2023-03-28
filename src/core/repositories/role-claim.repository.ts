import { BaseRepository } from "./base.repository";
import { RoleClaim } from '../interfaces/contracts';
import { IRoleClaimRepository } from "../interfaces/repositories";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { Locator } from "../../constants";

@injectable()
export class RoleClaimRepository extends BaseRepository<RoleClaim> implements IRoleClaimRepository {
    constructor(
        @inject(Locator.ROLECLAIM_MODEL) readonly roleClaimModel: Model<RoleClaim>
    ) {
        super(roleClaimModel);
    }
}
