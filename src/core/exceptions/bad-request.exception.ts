import { StatusCode } from "../../constants";
import { ErrorParams } from "../../wrappers";
import { BaseException } from "./base.exception";

export class BadRequestException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.BAD_REQUEST, errorParams);
    }
}