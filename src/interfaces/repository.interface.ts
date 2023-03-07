export interface Writer<T> {
    create(item: Omit<T, 'id'>): Promise<T>;
    createMany(items: Omit<T, 'id'>[]): Promise<T[]>;
    update(id: string, item: Partial<T>): Promise<boolean>
    delete(id: string): Promise<boolean>
}

export interface Reader<T> {
    find(): Promise<T[]>;
    findOne(id: string): Promise<T>;
}