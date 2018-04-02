import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import { Login } from '@models/Login';
import { Session } from '@models/Session';
import { ENotificationType } from '@models/Notification';
import { ActionWithPayload } from '@actions/app.actions';
import { SessionActions, loginFinished, loginFailed } from '@actions/session.actions';
import { AuthService } from '../services/auth/auth.service';
import { NotificationService } from '../services/notification/notification.service';

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

    constructor(
        private actions$: Actions,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService
    ) {}
}
