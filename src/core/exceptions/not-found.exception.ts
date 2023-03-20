import { BaseException } from "./base.exception";
import { ErrorParams } from "../../wrappers";
import { StatusCode } from "../../constants";

export class NotFoundException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.NOT_FOUND, errorParams);
    }
}