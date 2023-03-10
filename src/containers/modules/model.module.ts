import { ContainerModule } from "inversify";
import { Model } from "mongoose";
import { User, Key, ApiKey } from "../../interfaces/model.interface";
import UserModel from "../../models/user.model";
import KeyModel from "../../models/key.model";
import ApiKeyModel from "../../models/apiKey.model";
import { Locator } from "../../constants/app.constant";

const modelContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<Model<User>>(Locator.UserModel).toConstantValue(UserModel);
    bind<Model<Key>>(Locator.KeyModel).toConstantValue(KeyModel);
    bind<Model<ApiKey>>(Locator.ApiKeyModel).toConstantValue(ApiKeyModel);
});

export default modelContainerModule;