import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { Role } from "../../interfaces/contracts";

export const roleSchema: Schema<Role> = new Schema<Role>({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: CollectionName.ROLE,
});
