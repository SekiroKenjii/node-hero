import BaseRepository from "../base.repository";
import { ApiKey } from '../../interfaces/model.interface';
import { inject, injectable } from "inversify";
import { IApiKeyRepository } from "../../interfaces/repositories/catalog/api-key.repository.interface";
import { Locator } from "../../constants/app.constant";
import { Model } from "mongoose";

@injectable()
export class ApiKeyRepository extends BaseRepository<ApiKey> implements IApiKeyRepository {
    constructor(@inject(Locator.ApiKeyModel) readonly model: Model<ApiKey>) {
        super(model);
    }
}