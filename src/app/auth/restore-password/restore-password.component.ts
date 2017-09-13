import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';

import { RECOVERY_TOKEN_PARAM_NAME } from '../auth.module';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';
import { CustomValidators } from '../../shared/validators/CustomValidators';

/**
 * This component is used to restore the password of an account identified by the passed token in the url
 */
@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

    public isLoading = true;

    public isTokenValid: boolean;

    public recoveryToken: string;

    public restoreForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) { }

    ngOnInit() {
        this.restoreForm = this._fb.group(
            {
                email: ['', Validators.compose([Validators.required, Validators.email])],
                password: ['', Validators.required],
                confirmPassword:  ['', Validators.required],
                recoveryToken: ''
            }, {
                validator: CustomValidators.matchingFields('password', 'confirmPassword')
            }
        );

        this._route.params
            .switchMap( (routeData: Params): Observable<Response> => {
                if (!routeData[RECOVERY_TOKEN_PARAM_NAME]) {
                    throw new Error(`no route param '${RECOVERY_TOKEN_PARAM_NAME}' found`);
                }
                this.recoveryToken = routeData[RECOVERY_TOKEN_PARAM_NAME];
                console.log('switchmap');
                return this._authSrvc.isRecoveryTokenValid(this.recoveryToken);
            })
            .finally(() => {
                console.log('finally');
                this.isLoading = false;
            })
            .catch((error: any) => {
                console.log(error);
                if (error.status === 402) {
                    this._notifSrvc.notifyError('token has expired');
                    // TODO redirect to password recovery request page
                } else if (error.status < 400 ||  error.status === 500) {
                    return Observable.throw(new Error(error.status));
                }
            })
            // .subscribe(() => console.log('next'), null, () => console.log('comlete'));
            .subscribe(
                val => {
                    this.isTokenValid = true;
                    console.log('subscribe result');
                },
                err => console.log(err)
            );
    }

    changePassword($event: Event): void {
        const values = this.restoreForm.value;
        this._authSrvc.changePasswordFromRecovery(values)
            .subscribe(
                resp => console.log('yes changed')
            );
    }
}
