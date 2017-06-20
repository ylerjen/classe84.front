import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { IAppState } from '../../stores/appState';
import { ISessionState } from '../../stores/session/session.reducer';
import { ICredentials } from '../../models/Login';
import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _loginSrv: LoginService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        const creds = this._loginSrv.getRememberedCreds();
        if (creds) {
            this.loginForm.setValue(creds);
        }
    }

    createForm() {
        this.loginForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: false
        });
    }

    resetForm() {
        this.loginForm.reset();
    }

    login() {
        const cb = () => {
            this._route.params
                .subscribe( (data: Params) => {
                    console.log(data);
                    if (data.redirectTo) {
                        this._router.navigate([data.redirectTo]);
                    }

                });
        };
        const creds: ICredentials = this.loginForm.value;
        if (creds.remember) {
            this._loginSrv.setRememberedCreds(creds);
        }
        this._loginSrv.login(creds, cb);
    }

}
