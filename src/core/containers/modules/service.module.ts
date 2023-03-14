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
    bind<IAuthService>(Locator.AuthService).to(AuthService).inRequestScope();
    bind<IKeyService>(Locator.KeyService).to(KeyService).inRequestScope();
    bind<ITokenService>(Locator.TokenService).to(TokenService).inRequestScope();
});
