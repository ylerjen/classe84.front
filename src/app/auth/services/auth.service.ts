import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment as env } from '../../../environments/environment';
import { User } from '@models/User';
import { Login, LoginFactory, PasswordRecoveryObject, PasswordChangeObject } from 'app/models/Login';
import { Session } from '@models/Session';
import { ROUTE } from '../auth-route.config';
import { ResetPasswordResponse } from '@models/ResetPasswordResponse';
import { SessionExpired } from '@actions/session.actions';
import { ExtendableError } from '@models/ExtendableError';
import { SessionFeatureState, selectLoggedUser } from '../state/selectors/session.selector';

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
        private _authHttp: HttpClient,
        private _store: Store<SessionFeatureState>,
        private _router: Router,
        public jwtHelper: JwtHelperService
    ) {
        this._store.select(state => selectLoggedUser(state))
            .subscribe((user: User) => {
                this._isLoggedIn = !!user;
            });
    }

    /**
     * Log the user by calling the login service
     * @param creds - the credentials used to login the user
     * @param successCb - the callback to call on success
     * @param errorCb - the callback to call on success
     */
    login(creds: Login, successCb?: () => void, errorCb?: () => void): Observable<Session> {
        const endpoint = `${authBaseRoute}/login`;
        return this._authHttp.post<Session>(endpoint, creds).pipe(
            map(json => {
                const session: Session = new Session(json);
                this.storeSession(session);
                return session;
            }),
            catchError((err: ExtendableError): Observable<any> => {
                this.deleteStoredSession();
                throw err.innerError;
            }),
        );
    }
    /**
     * Logout the user of the current session
     * @param successCb - a callback to execute when the logout succeed
     */
    logout(): Observable<string> {
        this.deleteStoredSession();
        if (!this.isLoggedIn()) {
            return of('loggedOut');
        }
        const endpoint = `${authBaseRoute}/logout`;
        return this._authHttp.post<string>(endpoint, {});
    }

    /**
     * Get the authenticated user info according to the jwt-token
     */
    getAuthUser(): Observable<User> {
        const endpoint = `${authBaseRoute}/user`;
        return this._authHttp.get<Session>(endpoint).pipe(
            map((body): User => new User(body.user)));
    }

    refreshSession(): Observable<Session> {
        const endpoint = `${authBaseRoute}/refresh`;
        return this._authHttp.post<Session>(endpoint, {});
    }

    /**
     * Recover an account password by sending an email to the user which own the email
     * @param email - is the email of the related user
     */
    recoverPassword(email): Observable<ResetPasswordResponse> {
        const endpoint = `${authBaseRoute}/reset-password`;
        const recoveryRoute = `${window.location.origin}/${ROUTE.restorePassword};${RECOVERY_TOKEN_PARAM_NAME}=${RECOVERY_TOKEN_VAR_NAME}`;
        const param = {
            email,
            frontUrl: recoveryRoute,
            tokenPlaceholder: RECOVERY_TOKEN_VAR_NAME
        };
        return this._authHttp.post<ResetPasswordResponse>(endpoint, param);
    }

    /**
     * Check if the recovery token is valid
     * @param recoveryToken - The recovery token to check
     */
    isRecoveryTokenValid(recoveryToken: string): Observable<Object> {
        const endpoint = `${authBaseRoute}/check-recovery-token-validity`;
        return this._authHttp.post(endpoint, { recoveryToken });
    }

    changePassword(info: PasswordChangeObject): Observable<Error> {
        const endpoint = `${authBaseRoute}/change-password`;
        throw new Error('not implemented yet');
        // return this._authHttp.post(endpoint, info);
    }

    /**
     * Change the password of a user with a recovery token
     * @param info - are the infos that are needed for the password change request
     */
    changePasswordFromRecovery(info: PasswordRecoveryObject): Observable<Object> {
        const endpoint = `${authBaseRoute}/change-password-from-recovery`;
        return this._authHttp.post(endpoint, info);
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
    isTokenValid(token: string, offsetSeconds?: number): boolean {
        return !this.jwtHelper.isTokenExpired(token, offsetSeconds);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const session = this.getStoredSession();
        console.log('canActive::auth.service', {storedSession: session});
        if (session) {
            if (this.isTokenValid(session.token)) {
                return true;
            }
            this._store.dispatch(new SessionExpired());
        }

        const redirectTo = state.url;
        console.warn(`can't activate route ${route.url}. Will redirect to : ${redirectTo}`);

        // FIXME: ROUTE_URL POSE PROBLEME LORSQU'IL EST UTILISE ICI. ERROR => Token is not defined!
        // this._router.navigate([ROUTE_URL.login, { redirectTo }]);
        this._router.navigate(['login', { redirectTo }]);
        return false;
    }
}
