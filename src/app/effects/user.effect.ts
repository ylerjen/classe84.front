import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import { Notification, ENotificationType } from '@models/Notification';
import { ActionWithPayload } from '@actions/app.actions';
import { addNotif } from '@actions/notifications.actions';
import { getUserFinished, getUserFailed, UserActions } from '@actions/user.actions';
import { UsersService } from 'app/user/services/users.service';

@Injectable()
export class UserEffects {

  @Effect()
  getUserStart$ = this.actions$
        .ofType(UserActions.getUserStart)
        .map((action: ActionWithPayload<number>): number => action.payload)
        .switchMap(payload => this._userService.get(payload))
        .map(user => getUserFinished(user))
        .catch((err: Error): Observable<ActionWithPayload<Error>> => of(getUserFailed(err)));

  @Effect()
  getUserFailed$ = this.actions$
        .ofType(UserActions.getUserFailed)
        .map((act: ActionWithPayload<Error>): ActionWithPayload<Notification> => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            const notif = new Notification(msg, ENotificationType.ERROR);
            return addNotif(notif);
        });

    constructor(
        private actions$: Actions,
        private _userService: UsersService,
    ) { }
}
