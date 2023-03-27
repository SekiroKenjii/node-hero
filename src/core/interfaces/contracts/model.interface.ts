import { Document, ObjectId } from 'mongoose';

export interface BaseModel extends Document { }

export interface ApiKey extends BaseModel {
    key: string;
    status: boolean;
    permissions: string[];
}

export interface Key extends BaseModel {
    user_id: ObjectId;
    public_key: string;
    private_key: string;
    old_refresh_tokens: string[];
    access_token: string;
    refresh_token: string;
}

export interface Role extends BaseModel {
    name: string;
    description: string;
}

export interface RoleClaim extends BaseModel {
    role_id: ObjectId;
    user_id: ObjectId;
    permissions: string[];
}

export interface User extends BaseModel {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    avatar_id: string;
    avatar_url: string;
    gender: string;
    is_active: boolean;
}
