import BaseRepository from "../base.repository";
import { Db } from 'mongodb';
import { ApiKey } from '../../interfaces/document.interface';

export class ApiKeyRepository extends BaseRepository<ApiKey> {
    constructor(db: Db) {
        super(db, 'ApiKeys');
    }
}