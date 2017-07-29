import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IGlobalState } from '../../stores/globalState';
import { ICredentials } from '../../models/Login';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from '../../models/Notification';
import { login, logout } from '../../actions/session.actions';
import { ASYNC_USER_SUCCESS } from '../../actions/users.actions';
import { LS_TOKEN_KEY } from '../../services/auth/auth.service';


const LS_CRED_KEY = 'app84LoginCreds';

@Injectable()
export class LoginService {

    constructor(
        private _http: Http,
        // private _http: AuthHttp,
        private _store: Store<IGlobalState>
    ) { }

    login(creds: ICredentials, successCallback?): void {
        const endpoint = `${env.API_URL}/login`;
        this._http.post(endpoint, creds)
            .map(res => res.json())
            .map(payload => {
                const token: string = payload.token;
                localStorage.setItem(LS_TOKEN_KEY, token);
                this._store.dispatch(login(payload.token));
                return payload;
            })
            .subscribe(
                successCallback,
                err => {
                    console.log(err);
                    const u = new Notification(err._body || err.message, ENotificationType.ERROR);
                    this._store.dispatch(addNotif(u));
                    setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
                }
            );
    }

    logout(): void {
        const endpoint = `${env.API_URL}/logout`;
        this._http.post(endpoint, {})
            .map(res => res.json())
            .map(payload => logout(payload))
            .subscribe(
                logoutAction => {
                    this._store.dispatch(logoutAction);
                    localStorage.removeItem(LS_TOKEN_KEY);
                },
                err => {
                    console.log(err);
                    if (err.status === 0) {
                        err.statusText = 'API not reachable';
                    }
                    const u = new Notification(`Error : ${err.statusText}`, ENotificationType.ERROR);
                    this._store.dispatch(addNotif(u));
                    setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
                }
            );

    }

    getRememberedCreds(): ICredentials {
        const str = localStorage.getItem(LS_CRED_KEY);
        if (typeof str === 'string') {
            return JSON.parse(str);
        }
    }
    setRememberedCreds(creds: ICredentials): void {
        const str = JSON.stringify(creds);
        localStorage.setItem(LS_CRED_KEY, str);
    }

    /**
     * Check if the current session token name is still valid
     * @returns {boolean} - if the token is still valid
     */
    isLoggedIn(): boolean {
        return tokenNotExpired();
    }
}
