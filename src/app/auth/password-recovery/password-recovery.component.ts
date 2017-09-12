import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
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

    public isTokenValid: boolean;

    public isLoading = true;

    public recoveryToken: string;

    public recoveryForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) { }

    ngOnInit() {
        this.recoveryForm = this._fb.group(
            {
                email: ['', Validators.compose([Validators.required, Validators.email])]
            }
        );
    }

    recover($event: Event): void {
        const formValues = this.recoveryForm.value;
        this._authSrvc.recoverPassword(formValues.email)
            .subscribe(
                resp => console.log('yes changed')
            );
    }
}
