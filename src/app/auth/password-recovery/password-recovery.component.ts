import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';
import { CustomValidators } from '../../shared/validators/CustomValidators';

/**
 * This component is used to ask for a token to recover the account of the passed email
 */
@Component({
    selector: 'app-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

    public isSending: boolean;

    public isSuccessful: boolean;

    public recoveryForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) { }

    ngOnInit() {
        this.recoveryForm = this._fb.group(
            { email: ['', Validators.compose([Validators.required, Validators.email])] }
        );
    }

    recover($event: Event): void {
        this.isSending = true;
        const formValues = this.recoveryForm.value;
        this._authSrvc.recoverPassword(formValues.email)
            .finally(() => this.isSending = false)
            .subscribe(
                (resp: Response) => this.isSuccessful = true,
                err => {
                    if (err.status === 404) {
                        this._notifSrvc.notifyError(`The email '${formValues.email}' is not registered for any member`);
                    }
                }
            );
    }
}
