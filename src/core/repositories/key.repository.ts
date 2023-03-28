import { BaseRepository } from "./base.repository";
import { Key } from '../interfaces/contracts';
import { inject, injectable } from "inversify";
import { IKeyRepository } from "../interfaces/repositories";
import { Locator } from "../../constants";
import { Model } from "mongoose";

@injectable()
export class KeyRepository extends BaseRepository<Key> implements IKeyRepository {
    constructor(
        @inject(Locator.KEY_MODEL) readonly keyModel: Model<Key>
    ) {
        super(keyModel);
    }

    async findByUserId(userId: string): Promise<Key | null> {
        return await this.findFirst({ user: userId });
    }
}
