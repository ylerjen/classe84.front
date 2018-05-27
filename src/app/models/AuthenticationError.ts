import { ExtendableError } from './ExtendableError';

export class AuthenticationError extends ExtendableError {
    constructor(msg) {
        super(msg);
    }
}
