import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { RoleClaim } from "../../interfaces/contracts";

export const roleClaimSchema: Schema<RoleClaim> = new Schema<RoleClaim>({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    role_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Role'
    },
    permissions: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    collection: CollectionName.ROLE_CLAIM,
});
