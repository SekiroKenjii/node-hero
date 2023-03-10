import { ContainerModule } from "inversify";
import { Locator } from "../../constants/app.constant";
import { IAuthService } from "../../interfaces/services/auth.service.interface";
import { IKeyService } from "../../interfaces/services/key.service.interface";
import { ITokenService } from "../../interfaces/services/token.service.interface";
import AuthService from '../../services/auth/auth.service';
import KeyService from '../../services/auth/key.service';
import TokenService from '../../services/auth/token.service';

const serviceContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IAuthService>(Locator.AuthService).to(AuthService).inRequestScope();
    bind<IKeyService>(Locator.KeyService).to(KeyService).inRequestScope();
    bind<ITokenService>(Locator.TokenService).to(TokenService).inRequestScope();
});

export default serviceContainerModule;