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

    public isProcessing: boolean;

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
                return this._authSrvc.isRecoveryTokenValid(this.recoveryToken);
            })
            .catch((error: any) => {
                if (error instanceof Error) {
                    this._notifSrvc.notifyError(error.message);
                } else {
                    console.log(error);
                    if (error.status === 402) {
                        this._notifSrvc.notifyError('The token has expired');
                        // TODO redirect to password recovery request page
                    } else if (error.status < 400 ||  error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                }
                this.isLoading = false;
            })
            .finally(() => {console.log('putain'); this.isLoading = false; })
            .subscribe(
                val => {
                    this.isTokenValid = true;
                    this.isLoading = false;
                },
                err => console.log(err)
            );
    }

    changePassword($event: Event): void {
        this.isProcessing = true;
        const values = this.restoreForm.value;
        this._authSrvc.changePasswordFromRecovery(values)
            .finally( () => this.isProcessing = false)
            .subscribe(
                resp => {
                    this._notifSrvc.notifySuccess('Your new password was successfully setted');
                    // TODO redirect to login
                },
                err => {
                    console.log(err);
                    this._notifSrvc.notifyError('Error, see console');
                }
            );
    }
}
