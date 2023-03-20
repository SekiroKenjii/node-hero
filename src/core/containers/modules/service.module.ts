import { ContainerModule } from "inversify";
import { Locator } from "../../../constants/app.constant";
import {
    IAuthService,
    IKeyService,
    ITokenService
} from "../../interfaces/services";
import {
    AuthService,
    KeyService,
    TokenService
} from '../../services/auth';

export const serviceContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IAuthService>(Locator.AUTH_SERVICE).to(AuthService).inRequestScope();
    bind<IKeyService>(Locator.KEY_SERVICE).to(KeyService).inRequestScope();
    bind<ITokenService>(Locator.TOKEN_SERVICE).to(TokenService).inRequestScope();
});
