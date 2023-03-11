import { Container } from "inversify";
import { modelContainerModule } from "./modules/model.module";
import { repositoryContainerModule } from "./modules/repository.module";
import { serviceContainerModule } from "./modules/service.module";
import { controllerContainerModule } from "./modules/controller.module";
import { routerContainerModule } from "./modules/router.module";

const appContainer: Container = new Container();

appContainer.load(
    modelContainerModule,
    repositoryContainerModule,
    serviceContainerModule,
    controllerContainerModule,
    routerContainerModule
);

export default appContainer;