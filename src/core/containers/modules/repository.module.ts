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
    bind<IUserRepository>(Locator.USER_REPOSITORY).to(UserRepository).inSingletonScope();
    bind<IKeyRepository>(Locator.KEY_REPOSITORY).to(KeyRepository).inSingletonScope();
    bind<IApiKeyRepository>(Locator.APIKEY_REPOSITORY).to(ApiKeyRepository).inSingletonScope();
});