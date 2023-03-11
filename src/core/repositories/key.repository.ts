import { BaseRepository } from "./base.repository";
import { Key } from '../interfaces/contracts/model.interface';
import { inject, injectable } from "inversify";
import { IKeyRepository } from "../interfaces/repositories/key.repository";
import { Locator } from "../../constants/app.constant";
import { Model } from "mongoose";

@injectable()
export class KeyRepository extends BaseRepository<Key> implements IKeyRepository {
    constructor(@inject(Locator.KeyModel) readonly model: Model<Key>) {
        super(model);
    }
}