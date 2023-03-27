import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { Key } from "../../interfaces/contracts";

export const keySchema: Schema<Key> = new Schema<Key>({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    public_key: {
        type: String,
        require: true
    },
    private_key: {
        type: String,
        require: true
    },
    old_refresh_tokens: {
        type: [String],
        default: []
    },
    access_token: {
        type: String,
        require: true
    },
    refresh_token: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: CollectionName.KEY,
});
