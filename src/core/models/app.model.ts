import { model, Model } from "mongoose";
import { DocumentName } from "../../constants/db.constant";
import { ApiKey, Key, User } from "../interfaces/contracts/model.interface";
import { apiKeySchema } from "./schemas/api-key.schema";
import { keySchema } from "./schemas/key.schema";
import { userSchema } from "./schemas/user.schema";

export const ApiKeyModel: Model<ApiKey> = model<ApiKey>(DocumentName.ApiKey, apiKeySchema);
export const KeyModel: Model<Key> = model<Key>(DocumentName.Key, keySchema);
export const UserModel: Model<User> = model<User>(DocumentName.User, userSchema);