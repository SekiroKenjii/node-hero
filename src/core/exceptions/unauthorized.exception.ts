import { BaseException } from "./base.exception";
import { ErrorParams } from "../../wrappers";
import { StatusCode } from "../../constants";

export class UnauthorizedException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Unauthorized, errorParams);
    }
}