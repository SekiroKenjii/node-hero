import { BaseException } from "./base.exception";
import { ErrorParams } from "../../wrappers";
import { StatusCode } from "../../constants";

export class UnprocessableException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Unprocessable, errorParams);
    }
}