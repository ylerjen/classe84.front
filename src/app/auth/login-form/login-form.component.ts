import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';
import { setUser } from '../../actions/session.actions';
import { login as loginAction } from '../../actions/session.actions';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { SessionUser } from '../../models/SessionUser';
import { ICredentials } from '../../models/Login';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from '../../models/Notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    public loginForm: FormGroup;

    public loggedUser: SessionUser;

    public isLoggingIn: boolean;

    public errorMsg: string;

    constructor(
        private _store: Store<ISessionState>,
        private _fb: FormBuilder,
        private _authSrvc: AuthService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this.createForm();
        this._store.select('sessionState')
            .subscribe( (state: ISessionState) => this.loggedUser = state.loggedUser ? state.loggedUser : null
        );
    }

    ngOnInit(): void {
        const creds = this._authSrvc.getRememberedCreds();
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
        this.isLoggingIn = true;
        const creds: ICredentials = this.loginForm.value;
        if (creds.remember) {
            this._authSrvc.setRememberedCreds(creds);
        }
        this._authSrvc.login(creds)
            .subscribe(
                (token: string) => {
                    this._store.dispatch(loginAction(token));
                    this._authSrvc.getAuthUser()
                        .subscribe(
                            user => this._store.dispatch(setUser(new SessionUser(user)))
                        );
                    this._route.params
                        .subscribe( (data: Params) => {
                            console.log(data);
                            if (data.redirectTo) {
                                this._router.navigate([data.redirectTo]);
                            }
                        });
                },
                err => {
                    console.log(err);
                    const u = new Notification(err._body || err.message, ENotificationType.ERROR);
                    this._store.dispatch(addNotif(u));
                    setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
                },
                () => this.isLoggingIn = false
            );
    }

}
