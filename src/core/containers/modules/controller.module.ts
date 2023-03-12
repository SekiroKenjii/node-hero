import { ContainerModule } from "inversify";
import { Locator } from "../../../constants/app.constant";
import { BaseController } from "../../controllers/base.controller";
import { ExampleController } from "../../controllers/example.controller";
import { AuthController } from "../../controllers/v1/auth.controller";

export const controllerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<BaseController>(Locator.BaseController).to(BaseController).inSingletonScope();
    bind<ExampleController>(Locator.ExampleController).to(ExampleController).inSingletonScope();
    bind<AuthController>(Locator.AuthController).to(AuthController).inSingletonScope();
});