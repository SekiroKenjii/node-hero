import { ContainerModule } from "inversify";
import { Locator } from "../../../constants/app.constant";
import { AuthRouter } from "../../routers/auth.router";
import { IndexRouter } from "../../routers/index.route";

export const routerContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<IndexRouter>(Locator.IndexRouter).to(IndexRouter).inSingletonScope();
    bind<AuthRouter>(Locator.AuthRouter).to(AuthRouter).inSingletonScope();
});