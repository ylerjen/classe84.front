import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { tap, map, catchError, concatMap } from 'rxjs/operators';

import { Login, PasswordChangeObject, PasswordRecoveryObject } from '@models/Login';
import { Session } from '@models/Session';
import { ENotificationType } from '@models/Notification';
import { ActionWithPayload } from '@actions/app.actions';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { AuthenticationError } from '@models/AuthenticationError';
import {
    SessionActions,
    LoginFailedAction,
    LogoutFinishedAction,
    LogoutFailedAction,
    LoginFinishedAction,
    AddFormErrorsAction } from '@actions/session.actions';

@Injectable()
export class SessionEffects {

    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(SessionActions.Login)
        .pipe(
            tap(action => console.log('action triggered', action)),
            concatMap((act: ActionWithPayload<Login>): Observable<Action> => {
                const creds: Login = act.payload;
                if (creds.remember) {
                    // TODO create this part but with secure cred mgmt
                    this._authSrvc.setRememberedCreds(creds);
                } else {
                    this._authSrvc.deleteRememberedCreds();
                }
                return this._authSrvc.login(creds).pipe(
                    map((res: Session): ActionWithPayload<Session> => {
                        return new LoginFinishedAction(res);
                    }),
                    catchError((err: HttpErrorResponse): Observable<ActionWithPayload<Error>> => {
                        let action: ActionWithPayload<Error>;
                        if (err.status === 401) {
                            action = new LoginFailedAction(new AuthenticationError(`Username/password doesn't match`));
                        } else {
                            action = new LoginFailedAction(new Error('Unhandled service error. Please report this to the web admin !'));
                        }
                        this._notifSrvc.notify(action.payload.message, ENotificationType.ERROR);
                        return of(action);
                    })
                );
            })
        );

    @Effect({dispatch: false})
    loginFinished$: Observable<Action> = this.actions$
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
            return { type: `NO ACTION` };
        });

    @Effect()
    loginFailed$: Observable<Action> = this.actions$
        .ofType(SessionActions.LoginFailed)
        .map( (act: ActionWithPayload<Error>) => {
            const err = act.payload;
            let newAction = { type: `NO ACTION` };
            this._authSrvc.deleteStoredSession();
            if (err instanceof ProgressEvent) {
                this._notifSrvc.notify(err.message, ENotificationType.ERROR);
            } else {
                newAction = new AddFormErrorsAction(err.message);
            }
            return newAction;
        });

    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(SessionActions.Logout)
        .switchMap((creds: Action): Observable<{}> => this._authSrvc.logout())
        .map((): Action => new LogoutFinishedAction())
        .catch((err: Error): Observable<Action> => {
            let action: Action;
            if (err.message === 'No JWT present or has expired') {
                action = new LogoutFinishedAction();
            } else {
                const error = new Error(`Unhandled service error. ${err.message}`);
                action = new LogoutFailedAction(error);
                console.error(error);
            }
            return of(action);
        });

    @Effect()
    logoutFinished$: Observable<Action> = this.actions$
        .ofType(SessionActions.LogoutFinished)
        .map((act: Action): Action => {
            const msg = 'Successfuly logged out';
            this._notifSrvc.notify(msg, ENotificationType.SUCCESS);
            this._router.navigate(['login']);
            return { type: `NO ACTION` };
        });

    @Effect()
    logoutFailed$: Observable<Action> = this.actions$
        .ofType(SessionActions.LogoutFailed)
        .map((act: ActionWithPayload<Error>): Action => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            this._notifSrvc.notify(msg, ENotificationType.ERROR);
            return { type: `NO ACTION` };
        });

    @Effect()
    sendPasswordRecoveryMail$ = this.actions$
        .ofType(SessionActions.SendPasswordRecoveryMail)
        .switchMap((act: ActionWithPayload<string>): Observable<Object> => this._authSrvc.recoverPassword(act.payload))
        .map((res): void => this._notifSrvc.notifySuccess('Password recovery email successfully send to XXX'))
        .catch((resp): Observable<Action> => {
            if (resp.status === 404) {
                this._notifSrvc.notifyError(`The given email is not registered for any user`);
            }
            return of({ type: `NO ACTION` });
        });

    @Effect()
    changePassword$ = this.actions$
        .ofType(SessionActions.ChangePassword)
        .switchMap((act: ActionWithPayload<PasswordChangeObject>): Observable<Object> => this._authSrvc.changePassword(act.payload))
        .map((res): void => this._notifSrvc.notifySuccess('Password successfully changed'))
        .catch((resp): Observable<Action> => {
            if (resp.status === 404) {
                this._notifSrvc.notifyError(`The given email is not registered for any user`);
            }
            return of({ type: `NO ACTION` });
        });



    @Effect()
    changePasswordFromRecovery$ = this.actions$
        .ofType(SessionActions.ChangePasswordFromRecovery)
        .switchMap((act: ActionWithPayload<PasswordRecoveryObject>): Observable<Object> =>
            this._authSrvc.changePasswordFromRecovery(act.payload)
        )
        .map((res: Response): void => this._notifSrvc.notifySuccess('Your new password was successfully setted'))
        .catch((resp: Response): Observable<Action> => {
            console.error(resp);
            this._notifSrvc.notifyError('Error, see console');
            return of({ type: `NO ACTION` });
        });

    constructor(
        private actions$: Actions,
        private _router: Router,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService
    ) { }
}
