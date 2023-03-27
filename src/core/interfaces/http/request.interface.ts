import { Request as ExpressRequest } from 'express';

export interface ApiKeyRequest {
    key: string;
    status: boolean;
    permissions?: string[];
}

export interface AuthenticationRequest {
    userId: string;
    accessToken: string;
    refreshToken: string;
    publicKey: string;
    privateKey: string;
}

export interface Request extends ExpressRequest {
    apiKey?: ApiKeyRequest;
    authentication?: AuthenticationRequest;
}

export interface SignUpRequest {
    fullname: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface SignInRequest {
    email: string;
    password: string;
    refreshToken?: string;
}
