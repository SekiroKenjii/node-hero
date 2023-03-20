import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { Key } from "../../interfaces/contracts";

export const keySchema: Schema<Key> = new Schema<Key>({
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    publicKey: {
        type: String,
        require: true
    },
    privateKey: {
        type: String,
        require: true
    },
    oldRefreshTokens: {
        type: [String],
        default: []
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: CollectionName.KEY,
});