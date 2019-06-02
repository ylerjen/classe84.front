import { ExtendableError } from './ExtendableError';

export class ForbiddenError extends ExtendableError {
    constructor(msg: string, innerError) {
        super(msg, innerError);

        Object.setPrototypeOf(this, ForbiddenError.prototype); // workaround to use instanceof. See: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    }


}
