import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { Login } from '@models/Login';
import { Session } from '@models/Session';
import { ENotificationType } from '@models/Notification';
import { ActionWithPayload } from '@actions/app.actions';
import { SessionActions, loginFinished, loginFailed, logoutFinished, logoutFailed } from '@actions/session.actions';
import { AuthService } from '../auth/services/auth.service';
import { NotificationService } from '@shared/services/notification/notification.service';

@Injectable()
export class SessionEffects {

    @Effect()
    login$ = this.actions$
        .ofType(SessionActions.Login)
        .switchMap((creds: ActionWithPayload<Login>): Observable<Session> => this._authSrvc.login(creds.payload))
        .map((res: Session): ActionWithPayload<Session> => loginFinished(res))
        .catch((err: Response): Observable<ActionWithPayload<Error>> => {
            let action: ActionWithPayload<Error>;
            if (err.status === 401) {
                action = loginFailed(new Error('Login attempt failed.'));
            }
            action = loginFailed(new Error('Unhandled service error. Please report this to the web admin !'));
            return Observable.of(action);
        });

    @Effect()
    loginFailed$ = this.actions$
        .ofType(SessionActions.LoginFailed)
        .map((act: ActionWithPayload<Error>): Action => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            this._notifSrvc.notify(msg, ENotificationType.ERROR);
            return { type: 'don t dispatch anything' };
        });

    @Effect()
    logout$ = this.actions$
        .ofType(SessionActions.Logout)
        .switchMap((creds: Action): Observable<Response> => this._authSrvc.logout())
        .map((res: Response): Action => logoutFinished())
        .catch((err: Response): Observable<ActionWithPayload<Error>> => {
            const action = logoutFailed(new Error('Unhandled service error. Please report this to the web admin !'));
            return Observable.of(action);
        });

    @Effect()
    logoutFinished$ = this.actions$
        .ofType(SessionActions.LogoutFinished)
        .map((act: Action): Action => {
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

    constructor(
        private actions$: Actions,
        private _router: Router,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService
    ) {}
}
