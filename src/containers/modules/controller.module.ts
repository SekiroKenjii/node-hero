import { ContainerModule } from "inversify";
import { Locator } from "../../constants/app.constant";
import BaseController from "../../controllers/base.controller";
import AuthController from "../../controllers/v1/auth.controller";

const controllerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<BaseController>(Locator.BaseController).to(BaseController).inSingletonScope();
    bind<AuthController>(Locator.AuthController).to(AuthController).inSingletonScope();
});

export default controllerContainerModule;