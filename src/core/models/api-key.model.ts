import { model, Model } from "mongoose";
import { DocumentName } from "../../constants";
import { ApiKey } from "../interfaces/contracts";
import { apiKeySchema } from "./schemas";

export const ApiKeyModel: Model<ApiKey> = model<ApiKey>(DocumentName.API_KEY, apiKeySchema);