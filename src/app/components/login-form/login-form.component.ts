import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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

    private loginForm: FormGroup;

    private isDisplayed = false;

    constructor(
        private fb: FormBuilder,
        private _loginSrv: LoginService,
        private _store: Store<IAppState>
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this._store.select('sessionState')
            .subscribe((sState: ISessionState) => {
                if (sState) {
                    this.isDisplayed = (sState.requestSignIn && !sState.isLoggedIn);
                }
            });
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: 'yann@example.org',
            password: 'password'
        });
    }

    resetForm() {
        this.loginForm.reset();
    }

    login() {
        const creds: ICredentials = this.loginForm.value;
        this._loginSrv.login(creds);
    }

    toggleDisplay(shouldDisplay) {
        let newDisplayState = !this.isDisplayed;
        if (typeof shouldDisplay !== 'boolean') {
            newDisplayState = shouldDisplay;
        }
        this.isDisplayed = !this.isDisplayed;
        console.log(this.isDisplayed);
    }

    close() {
        this.resetForm();
        this._loginSrv.requestSignIn(false);
    }


}
