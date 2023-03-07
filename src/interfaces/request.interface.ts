import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    keyObject?: {
        key: string;
        status: boolean;
        permissions?: string[];
    };
}

export interface SignUpRequest {
    fullname: string;
    email: string;
    password: string;
}