import { model, Schema } from "mongoose";
import { Key } from "../interfaces/document.interface";

const DOCUMENT_NAME: string = 'Key';
const COLLECTIONS_NAME: string = 'Keys';

const keySchema: Schema<Key> = new Schema<Key>({
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
    collection: COLLECTIONS_NAME,
});

export default model<Key>(DOCUMENT_NAME, keySchema);