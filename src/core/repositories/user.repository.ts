import { BaseRepository } from "./base.repository";
import { User } from '../interfaces/contracts';
import { IUserRepository } from "../interfaces/repositories";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { Locator } from "../../constants";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(@inject(Locator.UserModel) readonly model: Model<User>) {
        super(model);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this._model.findOne({ email: email }).lean();
    }
}