import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from 'app/services/auth/auth.service';
import { ISessionState } from 'app/stores/session/session.reducer';
import { login as loginAction, setUser } from 'app/actions/session.actions';
import { addNotif, deleteNotif } from 'app/actions/notifications.actions';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from 'app/models/Notification';
import { SessionUser } from 'app/models/SessionUser';
import { ICredentials } from 'app/models/Login';
import { IGlobalState } from 'app/stores/globalState';

@Component({
    selector: 'app-login-form-viewer',
    templateUrl: './login-form-viewer.component.html',
    styleUrls: ['./login-form-viewer.component.scss']
})
export class LoginFormViewerComponent implements OnInit {

    public loggedUser: SessionUser;

    public isLoggingIn: boolean;

    public errorMsg: string;

    constructor(
        private _store: Store<IGlobalState>,
        private _authSrvc: AuthService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this._store.select('sessionState')
            .subscribe((state: ISessionState) => this.loggedUser = state.loggedUser ? state.loggedUser : null
            );
    }

    ngOnInit() {
    }

    onLogin(creds: ICredentials) {
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
                    .subscribe((data: Params) => {
                        if (data.redirectTo) {
                            this._router.navigate([data.redirectTo]);
                        }
                    });
            },
            (err: Response) => {
                console.log(err);
                let msg;
                if (err.json() instanceof ProgressEvent) {
                    msg = "API error. See console";
                } else {
                    msg = err.json();
                }
                const u = new Notification(msg, ENotificationType.ERROR);
                this._store.dispatch(addNotif(u));
                setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
            },
            () => this.isLoggingIn = false
        );
    }
}
