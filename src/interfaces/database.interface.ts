export interface Database<T> {
    instance: T;
    connect(): void;
}