import { inject, injectable } from "inversify";
import { Locator } from "../../constants";
import { IRoleRepository } from "../interfaces/repositories";
import { IRoleService } from "../interfaces/services";

@injectable()
export class RoleService implements IRoleService {
    constructor(
        @inject(Locator.ROLE_REPOSITORY) private readonly _repository: IRoleRepository
    ) { }

    repository(): IRoleRepository {
        return this._repository;
    }
}
