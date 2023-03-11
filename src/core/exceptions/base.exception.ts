import { ErrorParams } from "../../wrappers/api-result";

export class BaseException extends Error {
    public statusCode: number;
    public errors?: string[];

    constructor(statusCode: number, errorParams: ErrorParams) {
        super(errorParams.message);

        this.statusCode = statusCode;
        this.errors = errorParams.errors;
    }
}