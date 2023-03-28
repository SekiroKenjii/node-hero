import { inject, injectable } from "inversify";
import { Locator } from "../../constants";
import { IRoleClaimRepository } from "../interfaces/repositories";
import { IRoleClaimService } from "../interfaces/services";

@injectable()
export class RoleClaimService implements IRoleClaimService {
    constructor(
        @inject(Locator.ROLECLAIM_REPOSITORY) private readonly _repository: IRoleClaimRepository
    ) { }

    repository(): IRoleClaimRepository {
        return this._repository;
    }
}
