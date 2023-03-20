import _ from 'lodash';

interface ErrorDetail {
    filepath: string;
    line: string;
    column: string;
}

export function pickFields<T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
    return _.pick(obj, fields) as Pick<T, K>;
}

export function getError(error: Error): ErrorDetail {
    const regex = /\((.*):(\d+):(\d+)\)$/;

    if (error.stack === undefined || error.stack === null) {
        return {
            filepath: 'failed to get error detail!',
            line: 'failed to get error detail!',
            column: 'failed to get error detail!'
        } as ErrorDetail;
    }

    const match = regex.exec(error.stack.split("\n")[2]);

    if (match === null) {
        return {
            filepath: 'failed to get error detail!',
            line: 'failed to get error detail!',
            column: 'failed to get error detail!'
        } as ErrorDetail;
    }

    return {
        filepath: match[1],
        line: match[2],
        column: match[3]
    } as ErrorDetail;
}