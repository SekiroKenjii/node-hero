import { ContainerModule } from "inversify";
import { Locator } from "../../../constants";
import { BaseController } from "../../controllers/base.controller";
import { ExampleController } from "../../controllers/example.controller";
import { AuthController } from "../../controllers/v1";

export const controllerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<BaseController>(Locator.BASE_CONTROLLER).to(BaseController).inSingletonScope();
    bind<ExampleController>(Locator.EXAMPLE_CONTROLLER).to(ExampleController).inSingletonScope();
    bind<AuthController>(Locator.AUTH_CONTROLLER).to(AuthController).inSingletonScope();
});