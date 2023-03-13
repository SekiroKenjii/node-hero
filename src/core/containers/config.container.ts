import { Container } from "inversify";
import {
    modelContainerModule,
    repositoryContainerModule,
    serviceContainerModule,
    controllerContainerModule,
    routerContainerModule
} from "./modules";

const appContainer: Container = new Container();

appContainer.load(
    modelContainerModule,
    repositoryContainerModule,
    serviceContainerModule,
    controllerContainerModule,
    routerContainerModule
);

export default appContainer;