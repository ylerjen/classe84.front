import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { Login, PasswordChangeObject, PasswordRecoveryObject } from '@models/Login';
import { Session } from '@models/Session';
import { ENotificationType } from '@models/Notification';
import { ActionWithPayload } from '@actions/app.actions';
import { SessionActions, loginFailed, logoutFinished, logoutFailed, LoginFinishedAction } from '@actions/session.actions';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '@shared/services/notification/notification.service';

@Injectable()
export class SessionEffects {

    @Effect()
    login$ = this.actions$
        .ofType(SessionActions.Login)
        .switchMap((act: ActionWithPayload<Login>): Observable<Session> => {
            const creds: Login = act.payload;
            if (creds.remember) {
                // TODO create this part but with secure cred mgmt
                this._authSrvc.setRememberedCreds(creds);
            } else {
                this._authSrvc.deleteRememberedCreds();
            }
            return this._authSrvc.login(creds);
        })
        .map((res: Session): ActionWithPayload<Session> => new LoginFinishedAction(res))
        .catch((err: Response): Observable<ActionWithPayload<Error>> => {
            let action: ActionWithPayload<Error>;
            if (err.status === 401) {
                action = loginFailed(new Error('Username or password was wrong'));
            } else {
                action = loginFailed(new Error('Unhandled service error. Please report this to the web admin !'));
            }
            return Observable.of(action);
        });

    @Effect()
    loginFinished$ = this.actions$
        .ofType(SessionActions.LoginFinished)
        .map((act: ActionWithPayload<Session>) => {
            // TODO replace this hack with ngrx/router-store
            const path = window.location.pathname;
            const redirectParamName = 'redirectTo=';
            let redirectTo = path.substr(path.indexOf(redirectParamName) + redirectParamName.length);
            if (redirectTo) {
                redirectTo = decodeURIComponent(redirectTo);
                this._router.navigate([redirectTo]);
            }
            return { type: 'don t dispatch anything' };
        });

    @Effect()
    loginFailed$ = this.actions$
        .ofType(SessionActions.LoginFailed)
        .map((act: ActionWithPayload<Error>): Action => {
            const err = act.payload;
            console.error(err);
            this._authSrvc.deleteStoredSession();
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            this._notifSrvc.notify(msg, ENotificationType.ERROR);
            return { type: 'don t dispatch anything' };
        });

    @Effect()
    logout$ = this.actions$
        .ofType(SessionActions.Logout)
        .switchMap((creds: Action): Observable<{}> => this._authSrvc.logout())
        .map((): Action => logoutFinished())
        .catch((err: Error): Observable<Action> => {
            let action: Action;
            if (err.message === 'No JWT present or has expired') {
                action = logoutFinished();
            } else {
                action = logoutFailed(new Error(`Unhandled service error. ${err.message}`));
            }
            return Observable.of(action);
        });

    @Effect()
    logoutFinished$ = this.actions$
        .ofType(SessionActions.LogoutFinished)
        .map((act: Action): Action => {
            const msg = 'Successfuly logged out';
            this._notifSrvc.notify(msg, ENotificationType.SUCCESS);
            this._router.navigate(['login']);
            return { type: 'don t dispatch anything' };
        });

    @Effect()
    logoutFailed$ = this.actions$
        .ofType(SessionActions.LogoutFailed)
        .map((act: ActionWithPayload<Error>): Action => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            this._notifSrvc.notify(msg, ENotificationType.ERROR);
            return { type: 'don t dispatch anything' };
        });

    @Effect()
    sendPasswordRecoveryMail$ = this.actions$
        .ofType(SessionActions.SendPasswordRecoveryMail)
        .switchMap((act: ActionWithPayload<string>): Observable<Response> => this._authSrvc.recoverPassword(act.payload))
        .map((res: Response): void => this._notifSrvc.notifySuccess('Password recovery email successfully send to XXX'))
        .catch((resp: Response): Observable<Action> => {
            if (resp.status === 404) {
                this._notifSrvc.notifyError(`The given email is not registered for any user`);
            }
            return Observable.of({ type: 'don t dispatch anything' });
        });

    @Effect()
    changePassword$ = this.actions$
        .ofType(SessionActions.ChangePassword)
        .switchMap((act: ActionWithPayload<PasswordChangeObject>): Observable<Response> => this._authSrvc.changePassword(act.payload))
        .map((res: Response): void => this._notifSrvc.notifySuccess('Password successfully changed'))
        .catch((resp: Response): Observable<Action> => {
            if (resp.status === 404) {
                this._notifSrvc.notifyError(`The given email is not registered for any user`);
            }
            return Observable.of({ type: 'don t dispatch anything' });
        });



    @Effect()
    changePasswordFromRecovery$ = this.actions$
        .ofType(SessionActions.ChangePasswordFromRecovery)
        .switchMap((act: ActionWithPayload<PasswordRecoveryObject>): Observable<Response> =>
            this._authSrvc.changePasswordFromRecovery(act.payload)
        )
        .map((res: Response): void => this._notifSrvc.notifySuccess('Your new password was successfully setted'))
        .catch((resp: Response): Observable<Action> => {
            console.error(resp);
            this._notifSrvc.notifyError('Error, see console');
            return Observable.of({ type: 'don t dispatch anything' });
        });

    constructor(
        private actions$: Actions,
        private _route: ActivatedRoute,
        private _router: Router,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService
    ) { }
}
