import { BaseException } from "./base.exception";
import { ErrorParams } from "../../wrappers";
import { StatusCode } from "../../constants";

export class ForbiddenException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Forbidden, errorParams);
    }
}