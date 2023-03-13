import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { ApiKey } from "../../interfaces/contracts";

export const apiKeySchema: Schema<ApiKey> = new Schema<ApiKey>({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222'],
    },
}, {
    timestamps: true,
    collection: CollectionName.ApiKey,
});