import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import { UUID } from 'angular2-uuid';

import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';
import { CustomValidators } from '../../shared/validators/CustomValidators';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    public compId: string;

    public isTokenValid: boolean;

    public isLoading = true;

    public recoveryToken: string;

    public restoreForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
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
                validator: CustomValidators.matchingFields('password', 'confirmPassword')
            }
        );

        this._route.params
            .switchMap( (routeData: Params): Observable<Response> => {
                if (!routeData.token) {
                    throw new Error('no route param "token" found');
                }
                this.recoveryToken = routeData.token;
                console.log('le token', this.recoveryToken)
                return this._authSrvc.isRecoveryTokenValid(routeData.token);
            })
            .finally(() => {console.log('finally'); this.isLoading = false;})
            .catch((error: any) => {
                console.log(error);
                if (error.status === 402) {
                    this._notifSrvc.notifyError('token has expired');
                    // TODO redirect to password recovery request page
                } else if (error.status < 400 ||  error.status === 500) {
                    return Observable.throw(new Error(error.status));
                }
            })
            .subscribe(
                (val) => this.isTokenValid = true,
                (err) => console.log(err),
                // () => { console.log('finished'); this.isLoading = false; }
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
