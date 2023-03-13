import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { User } from "../../interfaces/contracts";

export const userSchema: Schema<User> = new Schema<User>({
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
    collection: CollectionName.User,
});