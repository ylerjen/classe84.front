import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';
import { ROUTE, RECOVERY_TOKEN_PARAM_NAME, RECOVERY_TOKEN_VAR_NAME } from '../../auth/auth.module';
import { User } from '../../models/User';
import { ROUTE_URL } from '../../config/router.config';
import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';
import { ICredentials } from '../../models/Login';
import { logout as logoutAction } from '../../actions/session.actions';
import { ASYNC_USER_SUCCESS } from '../../actions/users.actions';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { Notification, ENotificationType, DEFAULT_NOTIF_DURATION } from '../../models/Notification';

const LS_TOKEN_KEY = 'jwt-token';
const LS_CRED_KEY = 'app84LoginCreds';
const TOKEN_VAR_NAME = '${token}';

@Injectable()
export class AuthService implements CanActivate {
    private _isLoggedIn = false;

    constructor(
        private _http: Http,
        private _authHttp: AuthHttp,
        private _store: Store<IGlobalState>,
        private _router: Router,
    ) {
        this._store.select('sessionState')
            .subscribe((sessionState: ISessionState) => {
                this._isLoggedIn = sessionState.isLoggedIn;
            });
    }

    /**
     * Log the user by calling the login service
     * @param creds - the credentials used to login the user
     * @param successCb - the callback to call on success
     * @param errorCb - the callback to call on success
     */
    login(creds: ICredentials, successCb?, errorCb?): Observable<string> {
        const endpoint = `${env.API_URL}/login`;
        return this._http.post(endpoint, creds)
            .map(res => res.json())
            .map(payload => {
                const token: string = payload.token;
                this.setTokenToStorage(token);
                return token;
            });
    }

    logout(successCb: () => void): void {
        this._store.dispatch(logoutAction(null));
        this.deleteTokenInStorage();
        successCb();

        // const endpoint = `${env.API_URL}/logout`;
        // this._authHttp.post(endpoint, {})
        //     .map(res => res.json())
        //     .map(payload => logoutAction(payload))
        //     .subscribe(
        //         logoutAction => {
        //             this._store.dispatch(logoutAction);
        //             this.deleteTokenInStorage();
        //             successCb();
        //         },
        //         err => {
        //             console.log(err);
        //             if (err.status === 0) {
        //                 err.statusText = 'API not reachable';
        //             }
        //             const u = new Notification(`Error : ${err.statusText}`, ENotificationType.ERROR);
        //             this._store.dispatch(addNotif(u));
        //             setTimeout(() => this._store.dispatch(deleteNotif(u)), DEFAULT_NOTIF_DURATION);
        //         }
        //     );

    }

    /**
     * Get the authenticated user info according to the jwt-token
     */
    getAuthUser(): Observable<User> {
        const endpoint = `${env.API_URL}/auth-user`;
        return this._authHttp.get(endpoint)
            .map( resp => new User(resp.json().user));
    }

    /**
     * Recover an account password by sending an email to the user which own the email
     * @param email - is the email of the related user
     */
    recoverPassword(email): Observable<Response> {
        const endpoint = `${env.API_URL}/reset-password`;
        const recoveryRoute = `${window.location.origin}/${ROUTE.restorePassword};${RECOVERY_TOKEN_PARAM_NAME}=${RECOVERY_TOKEN_VAR_NAME}`;
        return this._http.post(endpoint, {email, frontUrl: recoveryRoute, tokenPlaceholder: RECOVERY_TOKEN_VAR_NAME });
    }

    /**
     * Check if the recovery token is valid
     * @param recoveryToken - The recovery token to check
     */
    isRecoveryTokenValid(recoveryToken: string): Observable<Response> {
        const endpoint = `${env.API_URL}/check-recovery-token-validity`;
        return this._http.post(endpoint, { recoveryToken });
    }

    /**
     * Change the password of a user with a recovery token
     * @param info - are the infos that are needed for the password change request
     */
    changePasswordFromRecovery(info: { email, recoveryToken, password }): Observable<Response> {
        const endpoint = `${env.API_URL}/change-password-from-recovery`;
        return this._http.post(endpoint, info);
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
