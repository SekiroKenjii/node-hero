interface KeyPair {
    publicKey: string;
    privateKey: string;
}

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export { KeyPair, TokenPair };