import { BaseException } from "./base.exception";
import { ErrorParams } from "../../wrappers";
import { StatusCode } from "../../constants";

export class ServerException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.InternalServerError, errorParams);

        this.setDefaultErrors();
    }

    private setDefaultErrors() {
        if (this.errors !== undefined && this.errors) {
            return;
        }

        this.errors = ['Internal Server Error!'];
    }
}