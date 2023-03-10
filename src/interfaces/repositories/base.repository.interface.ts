import { FilterQuery  } from 'mongoose';

export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    find(filter: FilterQuery<T>): Promise<T[]>;
    create(entity: Partial<T>): Promise<T>;
    createMany(entities: T[]): Promise<T[]>;
    update(id: string, entity: Partial<T>): Promise<T | null>
    delete(id: string): Promise<boolean>
}