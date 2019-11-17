import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

/**
 * This component is used to ask for a token to recover the account of the passed email.
 * It's commonly used for the "forgot your password ?" feature
 */
@Component({
    selector: 'app-account-recovery-form',
    templateUrl: './account-recovery-form.component.html',
    styleUrls: ['./account-recovery-form.component.scss']
})
export class AccountRecoveryFormComponent implements OnInit {

    public compId: string;
    public recoveryForm: FormGroup;

    @Output()
    public recoverEvent = new EventEmitter();

    constructor(
        private _fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.compId = UUID.UUID();
        this.recoveryForm = this._fb.group(
            { email: ['', Validators.compose([Validators.required, Validators.email])] }
        );
    }

    recover($event: Event): void {
        const formValues = this.recoveryForm.value;
        this.recoverEvent.emit(formValues);
    }
}
