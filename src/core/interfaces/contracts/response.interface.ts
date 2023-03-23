import { TokenPair } from "./pair.interface";

export interface UserResponse {
    _id?: string;
    email: string;
    fullname: string;
}

export interface AuthenticationResponse {
    user: UserResponse;
    token: TokenPair
}

export interface KeyResponse {
    userId: string;
    publicKey: string;
    privateKey: string;
    accessToken: string;
    refreshToken: string;
    oldRefreshTokens: string[];
}