import { ContainerModule } from "inversify";
import { Model } from "mongoose";
import {
    User,
    Key,
    ApiKey
} from "../../interfaces/contracts";
import {
    ApiKeyModel,
    KeyModel,
    UserModel
} from "../../models";
import { Locator } from "../../../constants";

export const modelContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<Model<User>>(Locator.USER_MODEL).toConstantValue(UserModel);
    bind<Model<Key>>(Locator.KEY_MODEL).toConstantValue(KeyModel);
    bind<Model<ApiKey>>(Locator.APIKEY_MODEL).toConstantValue(ApiKeyModel);
});