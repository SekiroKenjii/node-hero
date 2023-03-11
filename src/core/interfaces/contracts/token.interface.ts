export interface Payload {
    userId: string;
    email: string;
    fullname?: string;
}

export interface Token {
    payload: Payload;
    publicKey: string;
    privateKey: string;
}