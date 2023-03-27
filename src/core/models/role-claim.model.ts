import { model, Model } from "mongoose";
import { DocumentName } from "../../constants";
import { RoleClaim } from "../interfaces/contracts";
import { roleClaimSchema } from "./schemas";

export const RoleClaimModel: Model<RoleClaim> =
    model<RoleClaim>(DocumentName.ROLE_CLAIM, roleClaimSchema);
