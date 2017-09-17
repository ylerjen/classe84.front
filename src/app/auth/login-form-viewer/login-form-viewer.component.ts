import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth/auth.service';
import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';
import { login as loginAction, setUser } from '../../actions/session.actions';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from '../../models/Notification';
import { SessionUser } from '../../models/SessionUser';
import { ICredentials } from '../../models/Login';

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
        private _store: Store<ISessionState>,
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
