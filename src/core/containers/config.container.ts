import { Container } from "inversify";
import {
    modelContainerModule,
    repositoryContainerModule,
    serviceContainerModule,
    controllerContainerModule,
    routerContainerModule,
    databaseContainerModule
} from "./modules";

const appContainer: Container = new Container();

appContainer.load(
    databaseContainerModule,
    modelContainerModule,
    repositoryContainerModule,
    serviceContainerModule,
    controllerContainerModule,
    routerContainerModule
);

export default appContainer;
