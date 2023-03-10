import BaseRepository from "../base.repository";
import { User } from '../../interfaces/model.interface';
import { IUserRepository } from "../../interfaces/repositories/catalog/user.repository.interface";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { Locator } from "../../constants/app.constant";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(@inject(Locator.UserModel) readonly model: Model<User>) {
        super(model);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.model.findOne({ email: email }).lean();
    }
}