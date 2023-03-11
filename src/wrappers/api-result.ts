type ResultParams = {
    message: string;
}

export interface ErrorParams extends ResultParams {
    errors?: string[];
}

export interface DataParams<T> extends ResultParams {
    data: T | null | undefined;
}

export class ApiResult<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T | null | undefined;
    errors?: string[];

    constructor(
        success: boolean, statusCode: number, message: string,
        data: T | null | undefined, errors?: string[]
    ) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }

    static fail<T>(statusCode: number, errorParams: ErrorParams) {
        return new ApiResult<T>(false, statusCode, errorParams.message, null, errorParams.errors);
    }

    static async failAsync<T>(statusCode: number, errorParams: ErrorParams) {
        return await this.fail<T>(statusCode, errorParams);
    }

    static success<T>(statusCode: number, dataParams: DataParams<T>) {
        return new ApiResult<T>(true, statusCode, dataParams.message, dataParams.data);
    }

    static async successAsync<T>(statusCode: number, dataParams: DataParams<T>) {
        return await this.success<T>(statusCode, dataParams);
    }
}