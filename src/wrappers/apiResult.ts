class ApiResult<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T | null | undefined;
    errors?: string[];

    constructor(statusCode: number, success: boolean,
        message: string, data: T | null | undefined, errors?: string[]) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }

    static fail<T>(statusCode: number, message: string, errors?: string[]) {
        return new ApiResult<T>(statusCode, false, message, null, errors);
    }

    static async failAsync<T>(statusCode: number, message: string, errors?: string[]) {
        return await this.fail<T>(statusCode, message, errors);
    }

    static success<T>(statusCode: number, message: string, data: T | null | undefined) {
        return new ApiResult<T>(statusCode, true, message, data);
    }

    static async successAsync<T>(statusCode: number, message: string, data: T | null | undefined) {
        return await this.success<T>(statusCode, message, data);
    }
}

export default ApiResult;