type ResultParams = {
    statusCode: number;
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

    static fail<T>(errorParams: ErrorParams) {
        return new ApiResult<T>(false, errorParams.statusCode, errorParams.message, null, errorParams.errors);
    }

    static async failAsync<T>(errorParams: ErrorParams) {
        return await this.fail<T>(errorParams);
    }

    static success<T>(dataParams: DataParams<T>) {
        return new ApiResult<T>(true, dataParams.statusCode, dataParams.message, dataParams.data);
    }

    static async successAsync<T>(dataParams: DataParams<T>) {
        return await this.success<T>(dataParams);
    }
}