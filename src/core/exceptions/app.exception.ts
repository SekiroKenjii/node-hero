import { BaseException } from "./base.exception";
import { ErrorParams } from "../../wrappers/api-result";
import { StatusCode } from "../../constants/app.constant";

export class BadRequestException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.BadRequest, errorParams);
    }
}

export class ConflictDataException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Conflict, errorParams);
    }
}

export class ForbiddenException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Forbidden, errorParams);
    }
}

export class NotFoundException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.NotFound, errorParams);
    }
}

export class UnauthorizedException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Unauthorized, errorParams);
    }
}

export class UnprocessableException extends BaseException {
    constructor(errorParams: ErrorParams) {
        super(StatusCode.Unprocessable, errorParams);
    }
}

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