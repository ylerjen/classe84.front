export class ValidationError {
    public code: number;
    public fields: Array<string>;
    public message: string;
    public parameters: Array<Object>
    public title: string;

    constructor(props: { [key: string]: any } = {}) {
        this.code = props.code;
        this.fields = props.fields;
        this.message = props.message;
        this.title = props.title;
    }
}
