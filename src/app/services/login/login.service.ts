import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IAppState } from '../../stores/appState';
import { ICredentials } from '../../models/Login';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from '../../models/Notification';
import { login, logout, requestSignIn } from '../../actions/session.actions';
import { ASYNC_USER_SUCCESS } from '../../actions/users.actions';


@Injectable()
export class LoginService {

    constructor(
        private _http: Http,
        // private _http: AuthHttp,
        private _store: Store<IAppState>
    ) { }

    requestSignIn(state?: boolean): void {
        if ( typeof state === 'undefined') {
            state = false;
        }
        this._store.dispatch(requestSignIn(state));
    }

    login(creds: ICredentials): void {
        const endpoint = `${env.API_URL}/login`;
        this._http.post(endpoint, creds)
            .map(res => res.json())
            .map(payload => login(payload))
            .subscribe(
                loginAction => this._store.dispatch(loginAction),
                err => {
                    console.log(err);
                    const u = new Notification(err._body || err.message, ENotificationType.ERROR);
                    this._store.dispatch(addNotif(u));
                    setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
                },
                () => console.log('Request Complete')
            );
    }

    logout(): void {
        const endpoint = `${env.API_URL}/logout`;
        this._http.post(endpoint, {})
            .map(res => res.json())
            .map(payload => logout(payload))
            .subscribe(
                logoutAction => this._store.dispatch(logoutAction),
                err => {
                    console.log(err);
                    const u = new Notification(err._body || err.message, ENotificationType.ERROR);
                    this._store.dispatch(addNotif(u));
                    setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
                },
                () => console.log('Request Complete')
            );

    }

    /**
     * Check if the current session token name is still valid
     * @returns {boolean} - if the token is still valid
     */
    isLoggedIn(): boolean {
        return tokenNotExpired();
    }
}
