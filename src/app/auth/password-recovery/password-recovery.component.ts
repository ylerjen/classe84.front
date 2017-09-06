import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector: 'app-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

    public isTokenValid: boolean;

    public restoreForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) { }

    ngOnInit() {
        this.restoreForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword:  ['', Validators.required]
        });
        this._route.params
        .switchMap( (routeData: Params): Observable<Response> => {
            if (!routeData.token) {
                throw new Error('no route param "token" found');
            }
            return this._authSrvc.isRecoveryTokenValid(routeData.token);
        })
        .catch((error: any) => {
            console.log(error);
            if (error.status === 402) {
                this._notifSrvc.notifyError("token has expired");
            } else if (error.status < 400 ||  error.status === 500) {
                return Observable.throw(new Error(error.status));
            }
        })
        .subscribe(
            (val) => this.isTokenValid = true
        );
    }

}
