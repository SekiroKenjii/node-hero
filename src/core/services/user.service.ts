import { inject, injectable } from "inversify";
import {
    DefaultImage,
    Locator,
    Role
} from "../../constants";
import { User } from "../interfaces/contracts";
import { IUserRepository } from "../interfaces/repositories";
import {
    IRoleClaimService,
    IRoleService,
    IUserService
} from "../interfaces/services";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(Locator.USER_REPOSITORY) private readonly _repository: IUserRepository,
        @inject(Locator.ROLECLAIM_SERVICE) private readonly _roleClaimService: IRoleClaimService,
        @inject(Locator.ROLE_SERVICE) private readonly _roleService: IRoleService
    ) { }

    repository(): IUserRepository {
        return this._repository;
    }

    async createUser(request: Partial<User>): Promise<User | null> {
        const user = await this._repository.create({
            full_name: request.full_name,
            email: request.email,
            password: request.password,
            phone_number: request.phone_number,
            avatar_id: DefaultImage.MALE_AVATAR_ID,
            avatar_url: DefaultImage.MALE_AVATAR
        });

        if (!user) {
            console.log('UserService.createUser() => Line 24+: Failed to create new User Document!');

            return null;
        }

        const role = await this._roleService.repository().findByName(Role.BASIC);

        if (!role) {
            console.log('UserService.createUser() => Line 40: Failed to get Role Document!');

            return null;
        }

        const roleClaim = await this._roleClaimService.repository().create({
            user_id: user._id,
            role_id: role._id,
            permissions: [
                'profile.edit'
                // @todo - add more permissions
            ]
        });

        if (!roleClaim) {
            console.log('UserService.createUser() => Line 48+: Failed to create new RoleClaim Document!');

            return null;
        }

        return user;
    }

}
