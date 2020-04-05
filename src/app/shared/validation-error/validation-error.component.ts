import { Component, Input } from '@angular/core';

const preDefinedErrorsKey = ['required', 'minlength', 'email'];

@Component({
    selector: 'app-validation-error',
    templateUrl: './validation-error.component.html',
    styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {

    private _errors;

    @Input()
    set errors(val) {
        this._errors = val;
        this.orderErrors(val);
    }
    get errors() {
        return this._errors;
    }

    public preDefinedErrors: Map<string, any>;
    public specificErrors: Map<string, any>;

    private orderErrors(errorMap: { [key: string]: any } = {}): void {
        this.preDefinedErrors = new Map();
        this.specificErrors = new Map();
        for (const key in errorMap) {
            if (preDefinedErrorsKey.includes(key)) {
                this.preDefinedErrors[key] = errorMap[key];
            } else {
                this.specificErrors[key] = errorMap[key];
            }
        }
    }
}
