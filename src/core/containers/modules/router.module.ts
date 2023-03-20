import { ContainerModule } from "inversify";
import { Locator } from "../../../constants";
import { AuthRouter, IndexRouter } from "../../routers";

export const routerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IndexRouter>(Locator.INDEX_ROUTER).to(IndexRouter).inSingletonScope();
    bind<AuthRouter>(Locator.AUTH_ROUTER).to(AuthRouter).inSingletonScope();
});