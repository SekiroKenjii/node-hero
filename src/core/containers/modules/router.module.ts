import { ContainerModule } from "inversify";
import { Locator } from "../../../constants";
import { AuthRouter, IndexRouter } from "../../routers";

export const routerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IndexRouter>(Locator.IndexRouter).to(IndexRouter).inSingletonScope();
    bind<AuthRouter>(Locator.AuthRouter).to(AuthRouter).inSingletonScope();
});