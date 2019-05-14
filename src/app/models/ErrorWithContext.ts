export class ErrorWithContext<T> {
    constructor(
        public error: Error,
        public context: T
    ) { }
}
