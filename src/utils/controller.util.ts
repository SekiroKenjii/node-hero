import { Response } from "express";
import { ApiResult } from "../wrappers/api-result";

export function handleResult<T>(res: Response, result: ApiResult<T>) {
    res.status(result.statusCode).send(result);
}