import { injectable } from "inversify";
import { FilterQuery, Model } from "mongoose";
import { BaseModel } from "../interfaces/contracts/model.interface";
import { IRepository } from "../interfaces/repositories/repository.interface";

@injectable()
export class BaseRepository<T extends BaseModel> implements IRepository<T> {
    protected readonly _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    public get queryBuilder(): Model<T> {
        return this._model;
    }

    async findAll(): Promise<T[]> {
        return await this._model.find().exec();
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id).exec();
    }

    async find(filter: FilterQuery<T>): Promise<T[]> {
        return await this._model.find(filter).exec();
    }

    async create(entity: Partial<T>): Promise<T> {
        return await this._model.create(entity);
    }

    async createMany(entities: T[]): Promise<T[]> {
        return await this._model.create(entities);
    }

    async update(id: string, entity: Partial<T>): Promise<T | null> {
        const existing = await this._model.findById(id).exec();

        if (!existing) {
            return null;
        }

        Object.assign(existing, entity);
        return existing.save();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._model.deleteOne({ _id: id }).exec();

        return result.deletedCount === 1;
    }
}