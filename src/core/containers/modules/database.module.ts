import { ContainerModule } from "inversify";
import { Locator } from "../../../constants";
import { MongoDb } from "../../../db/mongo.db";

export const databaseContainerModule: ContainerModule = new ContainerModule((bind) => {
    bind<MongoDb>(Locator.MONGO_DB).to(MongoDb).inSingletonScope();
});
