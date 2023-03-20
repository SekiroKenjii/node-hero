import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    apiKey?: {
        key: string;
        status: boolean;
        permissions?: string[];
    };

    userKey?: {
        userId: string;
        publicKey: string;
    }
}

export interface SignUpRequest {
    fullname: string;
    email: string;
    password: string;
}

export interface SignInRequest {
    email: string;
    password: string;
    refreshToken?: string;
}