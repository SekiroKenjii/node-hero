import { model, Model } from "mongoose";
import { DocumentName } from "../../constants";
import { Key } from "../interfaces/contracts";
import { keySchema } from "./schemas";

export const KeyModel: Model<Key> = model<Key>(DocumentName.Key, keySchema);