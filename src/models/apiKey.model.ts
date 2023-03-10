import { model, Schema } from "mongoose";
import { ApiKey } from "../interfaces/model.interface";

const DOCUMENT_NAME: string = 'ApiKey';
const COLLECTIONS_NAME: string = 'ApiKeys';

const apiKeySchema: Schema<ApiKey> = new Schema<ApiKey>({
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
    collection: COLLECTIONS_NAME,
});

export default model<ApiKey>(DOCUMENT_NAME, apiKeySchema);