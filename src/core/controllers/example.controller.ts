import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { StatusCode } from "../../constants/app.constant";
import { ApiResult } from "../../wrappers/api-result";
import { BaseController } from "./base.controller";

@injectable()
export class ExampleController extends BaseController {
    example = async (req: Request, res: Response, next: NextFunction) => {
        return this.handleResult(res, await ApiResult.successAsync<string>(StatusCode.Ok, {
            message: 'OK',
            data: 'Node Server example route.'
        }));
    }
}