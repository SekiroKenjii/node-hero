import { model, Model } from "mongoose";
import { DocumentName } from "../../constants";
import { Role } from "../interfaces/contracts";
import { roleSchema } from "./schemas";

export const RoleModel: Model<Role> = model<Role>(DocumentName.ROLE, roleSchema);
