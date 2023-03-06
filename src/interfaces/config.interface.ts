export interface AppConfig {
    port: number;
    apiVersion?: string;
}

export interface DbConfig {
    host: string;
    port: number;
    name: string;
}

export interface EnvConfig {
    app: AppConfig;
    db: DbConfig;
}