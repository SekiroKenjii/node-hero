export interface AppConfig {
    port: number;
    apiVersion?: number;
}

export interface DbConfig {
    user_name: string;
    password: string;
    host: string;
    port: number;
    name: string;
}

export interface EnvConfig {
    app: AppConfig;
    db: DbConfig;
}
