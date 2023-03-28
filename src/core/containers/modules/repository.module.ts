import { ContainerModule } from "inversify";
import { Locator } from "../../../constants";
import {
    IApiKeyRepository,
    IKeyRepository,
    IRoleClaimRepository,
    IRoleRepository,
    IUserRepository
} from "../../interfaces/repositories";
import {
    ApiKeyRepository,
    KeyRepository,
    RoleClaimRepository,
    RoleRepository,
    UserRepository
} from "../../repositories";

export const repositoryContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IKeyRepository>(Locator.KEY_REPOSITORY).to(KeyRepository).inSingletonScope();
    bind<IApiKeyRepository>(Locator.APIKEY_REPOSITORY).to(ApiKeyRepository).inSingletonScope();
    bind<IRoleRepository>(Locator.ROLE_REPOSITORY).to(RoleRepository).inSingletonScope();
    bind<IRoleClaimRepository>(Locator.ROLECLAIM_REPOSITORY).to(RoleClaimRepository).inSingletonScope();
    bind<IUserRepository>(Locator.USER_REPOSITORY).to(UserRepository).inSingletonScope();
});
