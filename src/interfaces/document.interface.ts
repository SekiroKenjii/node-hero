import { Document, ObjectId } from 'mongoose';

export interface ApiKey extends Document {
    key: string;
    status: boolean;
    permissions: string[];
}

export interface Key extends Document {
    user: ObjectId;
    publicKey: string;
    privateKey: string;
    refreshTokens: string[];
}

export interface User extends Document {
    fullname: string;
    email: string;
    password: string;
    status: string;
    verify: boolean;
    roles: string[];
}