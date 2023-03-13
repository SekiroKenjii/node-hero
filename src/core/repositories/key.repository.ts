import { BaseRepository } from "./base.repository";
import { Key } from '../interfaces/contracts';
import { inject, injectable } from "inversify";
import { IKeyRepository } from "../interfaces/repositories";
import { Locator } from "../../constants";
import { Model } from "mongoose";

@injectable()
export class KeyRepository extends BaseRepository<Key> implements IKeyRepository {
    constructor(@inject(Locator.KeyModel) readonly model: Model<Key>) {
        super(model);
    }
}