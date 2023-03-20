import { BaseRepository } from "./base.repository";
import { ApiKey } from '../interfaces/contracts';
import { inject, injectable } from "inversify";
import { IApiKeyRepository } from "../interfaces/repositories";
import { Locator } from "../../constants";
import { Model } from "mongoose";

@injectable()
export class ApiKeyRepository extends BaseRepository<ApiKey> implements IApiKeyRepository {
    constructor(
        @inject(Locator.APIKEY_MODEL) private readonly _apiKeyModel: Model<ApiKey>
    ) {
        super(_apiKeyModel);
    }
}