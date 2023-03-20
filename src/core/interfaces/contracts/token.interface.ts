import { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
    userId: string;
    email: string;
    fullname?: string;
}

export interface Token {
    payload: Payload;
    publicKey: string;
    privateKey: string;
}