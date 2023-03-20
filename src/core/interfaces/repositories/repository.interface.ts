import { FilterQuery, UpdateQuery } from 'mongoose';

export interface IRepository<T> {
    /**
     * Retrieve all documents from specified (T) table.
     *
     * @returns All documents currently existing in the DB.
     */
    findAll(): Promise<T[]>;

    /**
     * Retrieve a document from specified (T) table by id.
     *
     * @param id - The _id of the document.
     *
     * @returns A document with _id matching the requested id otherwise Null.
     */
    findById(id: string): Promise<T | null>;

    /**
     * Retrieve all documents from specified (T) table by custom filter condition.
     *
     * @param filter - Filter query to select the documents that match the query.
     *
     * @returns An array of documents.
     */
    find(filter: FilterQuery<T>): Promise<T[]>;

    /**
     * Create a new document for specified (T) table.
     *
     * @param entity - A requested document.
     *
     * @return A created document.
     */
    create(entity: Partial<T>): Promise<T>;

    /**
     * Create multiple new documents for the specified (T) table.
     *
     * @param entities - The requested documents.
     *
     * @returns An array of created documents.
     */
    createMany(entities: T[]): Promise<T[]>;

    /**
     * Update the first document that matches a specified id from the specified (T) table.
     *
     * @param id - The _id of the document.
     * @param entity - A document with new values.
     *
     * @returns An updated document.
     */
    update(id: string, entity: UpdateQuery<T>): Promise<T | null>

    /**
     * Delete the first document that matches a specified id from the specified (T) table.
     *
     * @param id - The _id of the document.
     *
     * @returns True if the document is deleted successfully otherwise False
     */
    delete(id: string): Promise<boolean>
}
