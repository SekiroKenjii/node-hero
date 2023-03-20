import { StatusCode } from "../../constants";
import { ErrorParams } from "../../wrappers";
import { BaseException } from "./base.exception";

export class ConflictDataException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.CONFLICT, errorParams);
    }
}