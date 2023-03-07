import { Collection, Db, ObjectId } from "mongodb";
import { Reader, Writer } from "../interfaces/repository.interface";

abstract class BaseRepository<T> implements Reader<T>, Writer<T> {
    public readonly collection: Collection;

    constructor(
        public readonly db: Db,
        public readonly tableName: string
    ) {
        this.collection = this.db.collection(this.tableName);
    }

    public get queryBuilder(): Collection {
        return this.collection;
    }


    async find(): Promise<T[]> {
        const result = await this.collection.find().toArray();

        return result as T[];
    }

    async findOne(id: string): Promise<T> {
        const result = await this.collection.findOne({ _id: new ObjectId(id) });
        return result as T;
    }

    async create(item: Omit<T, 'id'>): Promise<T> {
        const result = await this.collection.insertOne(item);
        const insertedId = result.insertedId;
        const insertedItem = await this.collection.findOne({ _id: insertedId });

        return insertedItem as T;
    }

    async createMany(items: Omit<T, 'id'>[]): Promise<T[]> {
        const result = await this.collection.insertMany(items);
        const insertedIds = result.insertedIds as ObjectId[];
        const insertedItems = await this.collection.find({
            _id: { $in: Object.values(insertedIds) }
        }).toArray();

        return insertedItems as T[];
    }

    async update(id: string, item: Partial<T>): Promise<boolean> {
        const result = await this.collection.replaceOne({ _id: new ObjectId(id) }, item);

        return result.modifiedCount > 0;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });

        return result.deletedCount > 0;
    }
}

export default BaseRepository;