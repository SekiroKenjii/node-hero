import { Response } from 'express';
import { controller } from 'inversify-express-utils';
import { ApiResult } from '../../wrappers';

@controller('base')
export class BaseController {
    handleResult<T>(res: Response, result: ApiResult<T>): void {
        res.status(result.statusCode).send(result);
    }
}