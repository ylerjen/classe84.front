import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';
import { User } from 'app/models/User';
import { IGlobalState } from 'app/stores/globalState';
import { ISessionState } from 'app/stores/session/session.reducer';
import { Login, LoginFactory, PasswordRecoveryObject, PasswordChangeObject } from 'app/models/Login';
import { Session } from '@models/Session';
import { ROUTE } from '../auth-route.config';

export const RECOVERY_TOKEN_VAR_NAME = '${token}';
export const RECOVERY_TOKEN_PARAM_NAME = 'recoveryToken';
const STORAGE_SESSION_KEY = 'app-session';
const LS_CRED_KEY = 'app-login-creds';

const authBaseRoute = `${env.API_URL}/auth`;

@Injectable()
export class AuthService implements CanActivate {

    private _isLoggedIn = false;

    static getSessionToken(): string {
        const session = AuthService.getSessionFromStorage();
        return session ? session.token : null;
    }

    static getSessionFromStorage(): Session {
        const storageContent: Object = JSON.parse(sessionStorage.getItem(STORAGE_SESSION_KEY));
        return storageContent ? new Session(storageContent) : null;
    }

    static setSessionInStorage(session: Session): void {
        sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    }

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
    login(creds: Login, successCb?, errorCb?): Observable<Session> {
        const endpoint = `${authBaseRoute}/login`;
        return this._http.post(endpoint, creds)
            .map(res => {
                const session: Session = new Session(res.json());
                this.storeSession(session);
                return session;
            });
    }
    /**
     * Logout the user of the current session
     * @param successCb - a callback to execute when the logout succeed
     */
    logout(): Observable<Response> {
        const endpoint = `${authBaseRoute}/logout`;
        return this._authHttp.post(endpoint, {});
    }

    /**
     * Get the authenticated user info according to the jwt-token
     */
    getAuthUser(): Observable<User> {
        const endpoint = `${authBaseRoute}/user`;
        return this._authHttp.get(endpoint)
            .map( resp => new User(resp.json().user));
    }

    /**
     * Recover an account password by sending an email to the user which own the email
     * @param email - is the email of the related user
     */
    recoverPassword(email): Observable<Response> {
        const endpoint = `${authBaseRoute}/reset-password`;
        const recoveryRoute = `${window.location.origin}/${ROUTE.restorePassword};${RECOVERY_TOKEN_PARAM_NAME}=${RECOVERY_TOKEN_VAR_NAME}`;
        const param = {
            email,
            frontUrl: recoveryRoute,
            tokenPlaceholder: RECOVERY_TOKEN_VAR_NAME
        };
        return this._http.post(endpoint, param);
    }

    /**
     * Check if the recovery token is valid
     * @param recoveryToken - The recovery token to check
     */
    isRecoveryTokenValid(recoveryToken: string): Observable<Response> {
        const endpoint = `${authBaseRoute}/check-recovery-token-validity`;
        return this._http.post(endpoint, { recoveryToken });
    }

    changePassword(info: PasswordChangeObject): Observable<Response> {
        const endpoint = `${authBaseRoute}/change-password`;
        throw 'not implemented yet';
        // return this._http.post(endpoint, info);
    }

    /**
     * Change the password of a user with a recovery token
     * @param info - are the infos that are needed for the password change request
     */
    changePasswordFromRecovery(info: PasswordRecoveryObject): Observable<Response> {
        const endpoint = `${authBaseRoute}/change-password-from-recovery`;
        return this._http.post(endpoint, info);
    }

    getStoredSession(): Session {
        return AuthService.getSessionFromStorage();
    }

    storeSession(session: Session): void {
        AuthService.setSessionInStorage(session);
    }

    deleteStoredSession(): void {
        sessionStorage.removeItem(STORAGE_SESSION_KEY);
    }

    getRememberedCreds(): Login {
        const str = localStorage.getItem(LS_CRED_KEY);
        if (typeof str === 'string') {
            return LoginFactory.fromObject(JSON.parse(str));
        }
        return null;
    }

    setRememberedCreds(creds: Login): void {
        const str = JSON.stringify(creds);
        localStorage.setItem(LS_CRED_KEY, str);
    }

    deleteRememberedCreds(): void {
        localStorage.removeItem(LS_CRED_KEY);
    }

    /**
     * Check if the current session is still valid and not expired
     * @returns {boolean} - if the still has a valid session
     */
    isLoggedIn(): boolean {
        const storageContent = this.getStoredSession();
        return storageContent ? this.isTokenValid(storageContent.token) : false;
    }

    /**
     * Check if the jwt token is still valid according the content and the expiration date
     * @param token - the jwt token
     * @returns {boolean} - if the token is still valid
     */
    isTokenValid(token: string): boolean {
        return tokenNotExpired(STORAGE_SESSION_KEY, token);
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
        tokenName: STORAGE_SESSION_KEY,
        tokenGetter: () => AuthService.getSessionToken(),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        // noJwtError: true, // true = if jwt is missing, then fallback to simple http
    });
    return new AuthHttp(config, http, options);
}
