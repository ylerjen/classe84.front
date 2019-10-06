
import {throwError as observableThrowError,  Observable, Subscription } from 'rxjs';

import {finalize, catchError, switchMap} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';


import { UUID } from 'angular2-uuid';

import { GlobalState } from 'app/stores/globalState';
import { ChangePasswordFromRecovery } from '@actions/session.actions';
import { AuthService, RECOVERY_TOKEN_PARAM_NAME } from '../services/auth.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { CustomValidators } from '@shared/validators/CustomValidators';

/**
 * This component is used to restore the password of an account identified by the passed token in the url
 */
@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    public compId: string;

    public isLoading = true;

    public isProcessing: boolean;

    public isTokenValid: boolean;

    public recoveryToken: string;

    public restoreForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _store: Store<GlobalState>,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) { }

    ngOnInit() {
        this.compId = UUID.UUID();
        this.restoreForm = this._fb.group(
            {
                email: ['', Validators.compose([Validators.required, Validators.email])],
                password: ['', Validators.required],
                confirmPassword:  ['', Validators.required],
                recoveryToken: ''
            }, {
                validator: CustomValidators.sameFieldsContentValidator('password', 'confirmPassword')
            }
        );

        this.sub = this._route.params.pipe(
            switchMap( (routeData: Params): Observable<Object> => {
                if (!routeData[RECOVERY_TOKEN_PARAM_NAME]) {
                    throw new Error(`no route param '${RECOVERY_TOKEN_PARAM_NAME}' found`);
                }
                this.recoveryToken = routeData[RECOVERY_TOKEN_PARAM_NAME];
                return this._authSrvc.isRecoveryTokenValid(this.recoveryToken);
            }),
            catchError((error: any) => {
                if (error instanceof Error) {
                    this._notifSrvc.notifyError(error.message);
                } else {
                    console.log(error);
                    if (error.status === 402) {
                        this._notifSrvc.notifyError('The token has expired');
                        // TODO redirect to password recovery request page
                    } else if (error.status < 400 ||  error.status === 500) {
                        return observableThrowError(new Error(error.status));
                    }
                }
                this.isLoading = false;
            }),
            finalize(() => {console.log('putain'); this.isLoading = false; })
        ).subscribe(
            val => {
                this.isTokenValid = true;
                this.isLoading = false;
            },
            err => console.log(err)
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    changePassword($event: Event): void {

        // TODO manage the isProcessing from the applicationStore
        this.isProcessing = true;
        const values = this.restoreForm.value;
        this._store.dispatch(new ChangePasswordFromRecovery(values));
    }
}
