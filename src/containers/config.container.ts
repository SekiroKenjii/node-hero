import { Container } from "inversify";
import modelContainerModule from "./modules/model.module";
import repositoryContainerModule from "./modules/repository.module";
import serviceContainerModule from "./modules/service.module";
import controllerContainerModule from "./modules/controller.module";
import routerContainerModule from "./modules/router.module";

// Load Controller
import "../controllers/base.controller";
import "../controllers/v1/auth.controller";

const container = new Container();

container.load(
    modelContainerModule,
    repositoryContainerModule,
    serviceContainerModule,
    controllerContainerModule,
    routerContainerModule
);

export default container;