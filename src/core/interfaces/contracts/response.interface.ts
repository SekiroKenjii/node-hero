import { TokenPair } from "./pair.interface";

export interface UserResponse {
    _id?: string;
    email: string;
    fullname: string;
}

export interface AuthResponse {
    user: UserResponse;
    token: TokenPair
}