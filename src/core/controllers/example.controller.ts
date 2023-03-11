import { Request, Response, NextFunction } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { Locator, StatusCode } from "../../constants/app.constant";
import { handleResult } from "../../utils/controller.util";
import { ApiResult } from "../../wrappers/api-result";

@controller('/example')
export class ExampleController {
    constructor() {}

    @httpGet('/')
    async example(req: Request, res: Response, next: NextFunction) {
        return handleResult(res, await ApiResult.successAsync<string>(StatusCode.Ok, {
            message: 'OK',
            data: 'Node Server example route.'
        }));
    }
}