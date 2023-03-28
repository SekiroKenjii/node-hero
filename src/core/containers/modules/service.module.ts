import { ContainerModule } from "inversify";
import { Locator } from "../../../constants/app.constant";
import {
    IAuthService,
    IKeyService,
    IRoleClaimService,
    IRoleService,
    ITokenService,
    IUserService
} from "../../interfaces/services";
import {
    AuthService,
    KeyService,
    RoleClaimService,
    RoleService,
    TokenService,
    UserService
} from '../../services';

export const serviceContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IAuthService>(Locator.AUTH_SERVICE).to(AuthService).inRequestScope();
    bind<IKeyService>(Locator.KEY_SERVICE).to(KeyService).inRequestScope();
    bind<ITokenService>(Locator.TOKEN_SERVICE).to(TokenService).inRequestScope();
    bind<IRoleService>(Locator.ROLE_SERVICE).to(RoleService).inRequestScope();
    bind<IRoleClaimService>(Locator.ROLECLAIM_SERVICE).to(RoleClaimService).inRequestScope();
    bind<IUserService>(Locator.USER_SERVICE).to(UserService).inRequestScope();
});
