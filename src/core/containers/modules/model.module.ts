import { ContainerModule } from "inversify";
import { Model } from "mongoose";
import { User, Key, ApiKey } from "../../interfaces/contracts/model.interface";
import { ApiKeyModel, KeyModel, UserModel } from "../../models/app.model";
import { Locator } from "../../../constants/app.constant";

export const modelContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<Model<User>>(Locator.UserModel).toConstantValue(UserModel);
    bind<Model<Key>>(Locator.KeyModel).toConstantValue(KeyModel);
    bind<Model<ApiKey>>(Locator.ApiKeyModel).toConstantValue(ApiKeyModel);
});