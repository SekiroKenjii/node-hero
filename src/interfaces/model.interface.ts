import { Document, ObjectId } from 'mongoose';

export interface BaseModel extends Document {}

export interface ApiKey extends BaseModel {
    key: string;
    status: boolean;
    permissions: string[];
}

export interface Key extends BaseModel {
    user: ObjectId;
    publicKey: string;
    privateKey: string;
    refreshTokens: string[];
}

export interface User extends BaseModel {
    fullname: string;
    email: string;
    password: string;
    status: string;
    verify: boolean;
    roles: string[];
}