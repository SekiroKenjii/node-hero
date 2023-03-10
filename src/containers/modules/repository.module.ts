import { ContainerModule } from "inversify";
import { Locator } from "../../constants/app.constant";
import { IApiKeyRepository } from "../../interfaces/repositories/catalog/api-key.repository.interface";
import { IKeyRepository } from "../../interfaces/repositories/catalog/key.repository.interface";
import { IUserRepository } from "../../interfaces/repositories/catalog/user.repository.interface";
import { ApiKeyRepository } from "../../repositories/catalog/api-key.repository";
import { KeyRepository } from "../../repositories/catalog/key.repository";
import { UserRepository } from "../../repositories/catalog/user.repository";

const repositoryContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IUserRepository>(Locator.UserRepository).to(UserRepository).inSingletonScope();
    bind<IKeyRepository>(Locator.KeyRepository).to(KeyRepository).inSingletonScope();
    bind<IApiKeyRepository>(Locator.ApiKeyRepository).to(ApiKeyRepository).inSingletonScope();
});

export default repositoryContainerModule;