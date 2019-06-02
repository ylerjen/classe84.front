import { ExtendableError } from './ExtendableError';

export class UnauthorizedError extends ExtendableError {
    constructor(msg: string, innerError: Error) {
        super(msg, innerError);

        Object.setPrototypeOf(this, UnauthorizedError.prototype); // workaround to use instanceof. See: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }
}
