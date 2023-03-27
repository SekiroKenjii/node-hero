import { Schema } from "mongoose";
import { CollectionName } from "../../../constants";
import { User } from "../../interfaces/contracts";

export const userSchema: Schema<User> = new Schema<User>({
    full_name: {
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
        maxLength: 320
    },
    phone_number: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar_id: {
        type: String,
        require: true,
        maxLength: 250
    },
    avatar_url: {
        type: String,
        require: true,
        maxLength: 255
    },
    gender: {
        type: String,
        enum: ['undefined ', 'male', 'female'],
        default: 'undefined'
    },
    is_active: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: CollectionName.USER,
});
