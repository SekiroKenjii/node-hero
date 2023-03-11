import { ContainerModule } from "inversify";
import { Locator } from "../../../constants/app.constant";
import { ExampleController } from "../../controllers/example.controller";
import { AuthController } from "../../controllers/v1/auth.controller";

export const controllerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<ExampleController>(Locator.ExampleController).to(ExampleController).inSingletonScope();
    bind<AuthController>(Locator.AuthController).to(AuthController).inSingletonScope();
});