import { model, Model } from "mongoose";
import { DocumentName } from "../../constants";
import { User } from "../interfaces/contracts";
import { userSchema } from "./schemas";

export const UserModel: Model<User> = model<User>(DocumentName.USER, userSchema);