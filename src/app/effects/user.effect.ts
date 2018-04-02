import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ActionWithPayload } from '@actions/app.actions';
import { getUserFinished, getUserFailed, UserActions } from '@actions/user.actions';
import { UsersService } from 'app/user/services/users.service';
import { NotificationService } from '../services/notification/notification.service';
import { ENotificationType } from '@models/Notification';

@Injectable()
export class UserEffects {

  @Effect()
  getUserStart$ = this.actions$
        .ofType(UserActions.getUserStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<number>;
            return act.payload;
        })
        .switchMap(payload => this._userService.get(payload))
        .map(user => getUserFinished(user))
        .catch((err: Error): Observable<ActionWithPayload<Error>> => Observable.of(getUserFailed(err)));



  @Effect()
  getUserFailed$ = this.actions$
        .ofType(UserActions.getUserFailed)
        .map((act: ActionWithPayload<Error>): Action => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            this._notifSrvc.notify(msg, ENotificationType.ERROR);
            return { type: 'don t dispatch anything' };
        });

    constructor(
        private actions$: Actions,
        private _userService: UsersService,
        private _notifSrvc: NotificationService,
    ) { }
}
