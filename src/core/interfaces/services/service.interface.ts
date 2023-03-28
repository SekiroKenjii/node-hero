import { IRepository } from "../repositories";

export interface IService<TRepository> {
    repository(): TRepository;
}
