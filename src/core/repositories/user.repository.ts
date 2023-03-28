import { BaseRepository } from "./base.repository";
import { User } from '../interfaces/contracts';
import { IUserRepository } from "../interfaces/repositories";
import { inject, injectable } from "inversify";
import { Model } from "mongoose";
import { Locator } from "../../constants";

@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(
        @inject(Locator.USER_MODEL) readonly userModel: Model<User>
    ) {
        super(userModel);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.findFirst({ email: email });
    }
}
