import { ContainerModule } from "inversify";
import { Locator } from "../../../constants";
import {
    IApiKeyRepository,
    IKeyRepository,
    IUserRepository
} from "../../interfaces/repositories";
import {
    ApiKeyRepository,
    KeyRepository,
    UserRepository
} from "../../repositories";

export const repositoryContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IUserRepository>(Locator.UserRepository).to(UserRepository).inSingletonScope();
    bind<IKeyRepository>(Locator.KeyRepository).to(KeyRepository).inSingletonScope();
    bind<IApiKeyRepository>(Locator.ApiKeyRepository).to(ApiKeyRepository).inSingletonScope();
});