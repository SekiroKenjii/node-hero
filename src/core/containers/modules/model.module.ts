import { ContainerModule } from "inversify";
import { Model } from "mongoose";
import {
    User,
    Key,
    ApiKey,
    RoleClaim,
    Role
} from "../../interfaces/contracts";
import {
    ApiKeyModel,
    KeyModel,
    UserModel
} from "../../models";
import { Locator } from "../../../constants";
import { RoleModel } from "../../models/role.model";
import { RoleClaimModel } from "../../models/role-claim.model";

export const modelContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<Model<Role>>(Locator.ROLE_MODEL).toConstantValue(RoleModel);
    bind<Model<RoleClaim>>(Locator.ROLECLAIM_MODEL).toConstantValue(RoleClaimModel);
    bind<Model<User>>(Locator.USER_MODEL).toConstantValue(UserModel);
    bind<Model<Key>>(Locator.KEY_MODEL).toConstantValue(KeyModel);
    bind<Model<ApiKey>>(Locator.APIKEY_MODEL).toConstantValue(ApiKeyModel);
});
