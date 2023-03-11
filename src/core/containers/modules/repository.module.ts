import { ContainerModule } from "inversify";
import { Locator } from "../../../constants/app.constant";
import { IApiKeyRepository } from "../../interfaces/repositories/api-key.repository";
import { IKeyRepository } from "../../interfaces/repositories/key.repository";
import { IUserRepository } from "../../interfaces/repositories/user.repository.interface";
import { ApiKeyRepository } from "../../repositories/api-key.repository";
import { KeyRepository } from "../../repositories/key.repository";
import { UserRepository } from "../../repositories/user.repository";

export const repositoryContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IUserRepository>(Locator.UserRepository).to(UserRepository).inSingletonScope();
    bind<IKeyRepository>(Locator.KeyRepository).to(KeyRepository).inSingletonScope();
    bind<IApiKeyRepository>(Locator.ApiKeyRepository).to(ApiKeyRepository).inSingletonScope();
});