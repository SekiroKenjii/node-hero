import { model, Schema } from "mongoose";
import { User } from "../interfaces/model.interface";

const DOCUMENT_NAME: string = 'User';
const COLLECTIONS_NAME: string = 'Users';

const userSchema: Schema<User> = new Schema<User>({
    fullname: {
        type: String,
        require: true,
        maxLength: 150
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    verify: {
        type: Schema.Types.Boolean,
        default: false
    },
    roles: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTIONS_NAME,
});

export default model<User>(DOCUMENT_NAME, userSchema);