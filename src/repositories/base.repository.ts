import { injectable } from "inversify";
import { FilterQuery, Model } from "mongoose";
import { BaseModel } from "../interfaces/model.interface";
import { IBaseRepository } from "../interfaces/repositories/base.repository.interface";

@injectable()
abstract class BaseRepository<T extends BaseModel> implements IBaseRepository<T> {
    protected readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public get queryBuilder(): Model<T> {
        return this.model;
    }

    async findAll(): Promise<T[]> {
        return await this.model.find().exec();
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async find(filter: FilterQuery<T>): Promise<T[]> {
        return await this.model.find(filter).exec();
    }

    async create(entity: Partial<T>): Promise<T> {
        return await this.model.create(entity);
    }

    async createMany(entities: T[]): Promise<T[]> {
        return await this.model.create(entities);
    }

    async update(id: string, entity: Partial<T>): Promise<T | null> {
        const existing = await this.model.findById(id).exec();

        if (!existing) {
            return null;
        }

        Object.assign(existing, entity);
        return existing.save();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.model.deleteOne({ _id: id }).exec();

        return result.deletedCount === 1;
    }
}

export default BaseRepository;