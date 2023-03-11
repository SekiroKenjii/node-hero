import { Schema } from "mongoose";
import { CollectionName } from "../../../constants/db.constant";
import { Key } from "../../interfaces/contracts/model.interface";

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
    refreshTokens: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    collection: CollectionName.Key,
});