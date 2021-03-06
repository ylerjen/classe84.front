import { Component, OnInit, Input } from '@angular/core';

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
        this.formattedErrors = val;
    }
    get errors() {
        return this._errors;
    }

    public formattedErrors;

    constructor() { }
}
