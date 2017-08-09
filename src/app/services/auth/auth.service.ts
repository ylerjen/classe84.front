import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { ROUTE_URL } from '../../config/router.config';
import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';
import { ICredentials } from '../../models/Login';
import { login as loginAction, logout as logoutAction } from '../../actions/session.actions';
import { ASYNC_USER_SUCCESS } from '../../actions/users.actions';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from '../../models/Notification';

const LS_TOKEN_KEY = 'jwt-token';
const LS_CRED_KEY = 'app84LoginCreds';

@Injectable()
export class AuthService implements CanActivate {
    private _isLoggedIn = false;

    constructor(
        private _http: Http,
        private _store: Store<IGlobalState>,
        private _router: Router,
    ) {
        this._store.select('sessionState')
            .subscribe((sessionState: ISessionState) => {
                this._isLoggedIn = sessionState.isLoggedIn;
            });
    }

    login(creds: ICredentials, successCallback?): void {
        const endpoint = `${env.API_URL}/login`;
        this._http.post(endpoint, creds)
            .map(res => res.json())
            .map(payload => {
                const token: string = payload.token;
                this.setTokenToStorage(token);
                this._store.dispatch(loginAction(token));
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
            .map(payload => logoutAction(payload))
            .subscribe(
                logoutAction => {
                    this._store.dispatch(logoutAction);
                    this.deleteTokenInStorage();
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

    getTokenFromStorage(): string {
        return sessionStorage.getItem(LS_TOKEN_KEY);
    }

    setTokenToStorage(token: string): void {
        sessionStorage.setItem(LS_TOKEN_KEY, token);
    }

    deleteTokenInStorage(): void {
        sessionStorage.removeItem(LS_TOKEN_KEY);
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
        return tokenNotExpired(LS_TOKEN_KEY, this.getTokenFromStorage());
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isLoggedIn()) {
            return true;
        }

        const redirectTo = state.url;
         // FIXME ROUTE_URL POSE PROBLEME LORSQU'IL EST UTILISE ICI. ERROR => Token is not defined!
         // this._router.navigate([ROUTE_URL.login, { redirectTo }]);
         this._router.navigate(['login', { redirectTo }]);
        return false;
    }
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    const config = new AuthConfig({
        tokenName: LS_TOKEN_KEY,
        tokenGetter: (() => sessionStorage.getItem(LS_TOKEN_KEY)),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        // noJwtError: true, // true = if jwt is missing, then fallback to simple http
    });
    return new AuthHttp(config, http, options);
}
