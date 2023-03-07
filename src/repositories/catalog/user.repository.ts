import BaseRepository from "../base.repository";
import { Db } from 'mongodb';
import { User } from '../../interfaces/document.interface';

export class UserRepository extends BaseRepository<User> {
    constructor(db: Db) {
        super(db, 'Users');
    }
}