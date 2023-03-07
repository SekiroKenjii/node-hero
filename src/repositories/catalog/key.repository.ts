import BaseRepository from "../base.repository";
import { Db } from 'mongodb';
import { Key } from '../../interfaces/document.interface';

export class KeyRepository extends BaseRepository<Key> {
    constructor(db: Db) {
        super(db, 'Keys');
    }
}