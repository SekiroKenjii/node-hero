import _ from 'lodash';

export function pickFields<T, K extends keyof T>(obj: T, fields: K[]): Pick<T, K> {
    return _.pick(obj, fields) as Pick<T, K>;
}