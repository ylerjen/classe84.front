import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, concatMap, switchMap } from 'rxjs/operators';

import { HTTP_STATUS_CODE } from '@models/Constants';
import { Login } from '@models/Login';
import { Session } from '@models/Session';
import { ENotificationType } from '@models/Notification';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { AuthenticationError } from '@models/AuthenticationError';
import {
    SessionActionTypes,
    LoginFailedAction,
    LogoutFinishedAction,
    LogoutFailedAction,
    LoginFinishedAction,
    AddFormErrorsAction,
    LoginAction,
    SendPasswordRecoveryMail,
    ChangePassword,
    ChangePasswordFromRecovery} from '@actions/session.actions';

@Injectable()
export class SessionEffects {

    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(SessionActionTypes.Login),
        tap(action => console.log('action triggered', action)),
        concatMap((act: LoginAction): Observable<LoginFinishedAction | LoginFailedAction> => {
            const creds: Login = act.payload;
            if (creds.remember) {
                // TODO create this part but with secure cred mgmt
                this._authSrvc.setRememberedCreds(creds);
            } else {
                this._authSrvc.deleteRememberedCreds();
            }
            return this._authSrvc.login(creds).pipe(
                map((res: Session): LoginFinishedAction => new LoginFinishedAction(res)),
                catchError((err: HttpErrorResponse): Observable<LoginFailedAction> => {
                    let action: LoginFailedAction;
                    if (err.status === HTTP_STATUS_CODE.Unauthorized) {
                        action = new LoginFailedAction(new AuthenticationError(`Le login a échoué, vérifiez votre saisie.`));
                    } else {
                        action = new LoginFailedAction(new Error(`Erreur non gérée, veuillez contacter l'administrateur du site !`));
                    }
                    return of(action);
                })
            );
        }),
    );

    @Effect({dispatch: false})
    loginFinished$: Observable<Action> = this.actions$.pipe(
        ofType(SessionActionTypes.LoginFinished),
        tap((act: LoginFinishedAction) => {
            // TODO replace this hack with ngrx/router-store
            const path = window.location.pathname;
            const redirectParamName = 'redirectTo=';
            if (path.indexOf(redirectParamName) >= 0) {
                let redirectTo = path.substr(path.indexOf(redirectParamName) + redirectParamName.length);
                if (redirectTo) {
                    redirectTo = decodeURIComponent(redirectTo);
                    this._router.navigate([redirectTo]);
                }
            } else {
                this._router.navigate(['']);
            }
        })
    );

    @Effect()
    loginFailed$: Observable<Action> = this.actions$.pipe(
        ofType(SessionActionTypes.LoginFailed),
        map( (act: LoginFailedAction) => {
            const err = act.payload;
            let newAction = { type: `NO ACTION` };
            this._authSrvc.deleteStoredSession();
            if (err instanceof ProgressEvent) {
                this._notifSrvc.notify(err.message, ENotificationType.ERROR);
            } else {
                newAction = new AddFormErrorsAction(err.message);
            }
            return newAction;
        })
    );

    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType(SessionActionTypes.Logout),
        switchMap((): Observable<Object> => this._authSrvc.logout()),
        map((): Action => new LogoutFinishedAction()),
        catchError((err: Error): Observable<Action> => {
            let action: Action;
            if (err.message === 'No JWT present or has expired') {
                action = new LogoutFinishedAction();
            } else {
                const error = new Error(`Unhandled service error. ${err.message}`);
                action = new LogoutFailedAction(error);
                console.error(error);
            }
            return of(action);
        })
    );

    @Effect({dispatch: false})
    logoutFinished$: Observable<Action> = this.actions$.pipe(
        ofType(SessionActionTypes.LogoutFinished),
        tap((act: Action): void => {
            const msg = 'Successfuly logged out';
            this._notifSrvc.notify(msg, ENotificationType.SUCCESS);
            this._router.navigate(['login']);
        })
    );

    @Effect({dispatch: false})
    logoutFailed$: Observable<Action> = this.actions$.pipe(
        ofType(SessionActionTypes.LogoutFailed),
        tap((act: LogoutFailedAction): void => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            this._notifSrvc.notify(msg, ENotificationType.ERROR);
        })
    );

    @Effect()
    sendPasswordRecoveryMail$ = this.actions$.pipe(
        ofType(SessionActionTypes.SendPasswordRecoveryMail),
        switchMap((act: SendPasswordRecoveryMail): Observable<Object> => this._authSrvc.recoverPassword(act.payload)),
        map((res): void => this._notifSrvc.notifySuccess('Password recovery email successfully send to XXX')),
        catchError((resp): Observable<Action> => {
            if (resp.status === 404) {
                this._notifSrvc.notifyError(`The given email is not registered for any user`);
            }
            return of({ type: `NO ACTION` });
        })
    );

    @Effect()
    changePassword$ = this.actions$.pipe(
        ofType(SessionActionTypes.ChangePassword),
        switchMap((act: ChangePassword): Observable<Object> => this._authSrvc.changePassword(act.payload)),
        map((res): void => this._notifSrvc.notifySuccess('Password successfully changed')),
        catchError((resp): Observable<Action> => {
            if (resp.status === 404) {
                this._notifSrvc.notifyError(`The given email is not registered for any user`);
            }
            return of({ type: `NO ACTION` });
        })
    );

    @Effect()
    changePasswordFromRecovery$ = this.actions$.pipe(
        ofType(SessionActionTypes.ChangePasswordFromRecovery),
        switchMap((act: ChangePasswordFromRecovery): Observable<Object> =>
            this._authSrvc.changePasswordFromRecovery(act.payload)
        ),
        map((res: Response): void => this._notifSrvc.notifySuccess('Your new password was successfully setted')),
        catchError((resp: Response): Observable<Action> => {
            console.error(resp);
            this._notifSrvc.notifyError('Error, see console');
            return of({ type: `NO ACTION` });
        })
    );

    constructor(
        private actions$: Actions,
        private _router: Router,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService
    ) { }
}
