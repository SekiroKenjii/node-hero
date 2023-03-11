import { ApiKey } from "../contracts/model.interface";
import { IRepository } from "./repository.interface";

export interface IApiKeyRepository extends IRepository<ApiKey> {}