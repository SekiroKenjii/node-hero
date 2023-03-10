import { NextFunction, Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import ApiResult from "../wrappers/apiResult";

@controller('/')
class BaseController {
    handleResult<T>(result: ApiResult<T>) {
        return (req: Request, res: Response, next: NextFunction) => {
            return res.status(result.statusCode).send(result);
        }
    }

    @httpGet('example')
    example(req: Request, res: Response, next: NextFunction) {
        return res.status(200).send(ApiResult.success<string>(200, 'OK', 'Node Server example route'));
    }
}

export default BaseController;