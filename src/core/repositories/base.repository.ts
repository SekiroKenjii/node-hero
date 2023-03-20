import { injectable } from "inversify";
import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { BaseModel } from "../interfaces/contracts";
import { IRepository } from "../interfaces/repositories";

@injectable()
export class BaseRepository<T extends BaseModel> implements IRepository<T> {
    private readonly _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
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

    async update(id: string, entity: UpdateQuery<T>): Promise<T | null> {
        const options: QueryOptions<T> = { upsert: true, new: true };

        const result = await this._model.findByIdAndUpdate(id, entity, options);

        if (!result) {
            return null;
        }

        return result;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this._model.findByIdAndDelete(id);

        return result ? true : false;
    }
}