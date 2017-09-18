import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { CustomValidators } from '../../shared/validators/CustomValidators';

/**
 * This component is used to ask for a token to recover the account of the passed email
 */
@Component({
    selector: 'app-account-recovery-form',
    templateUrl: './account-recovery-form.component.html',
    styleUrls: ['./account-recovery-form.component.scss']
})
export class AccountRecoveryFormComponent implements OnInit {

    public recoveryForm: FormGroup;

    @Output()
    public recoverEvent = new EventEmitter();

    constructor(
        private _fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.recoveryForm = this._fb.group(
            { email: ['', Validators.compose([Validators.required, Validators.email])] }
        );
    }

    recover($event: Event): void {        
        const formValues = this.recoveryForm.value;
        this.recoverEvent.emit(formValues);
    }
}