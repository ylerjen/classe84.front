
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Notification, ENotificationType } from '@models/Notification';
import { AddNotif } from '@actions/notifications.actions';
import { GetUserFinished, GetUserFailed, UserActionTypes, GetUserStart } from 'app/user/states/actions/user.actions';
import { UsersService } from 'app/user/services/users.service';

@Injectable()
export class UserEffects {

    @Effect()
    getUserStart$ = this.actions$.pipe(
        ofType(UserActionTypes.getUserStart),
        map((action: GetUserStart): string => action.payload),
        switchMap(payload => this._userService.get(payload)),
        map(user => new GetUserFinished(user)),
        catchError((err: Error): Observable<GetUserFailed> => of(new GetUserFailed(err)))
    );

    @Effect()
    getUserFailed$ = this.actions$.pipe(
        ofType(UserActionTypes.getUserFailed),
        map((act: GetUserFailed): AddNotif => {
            const err = act.payload;
            console.error(err);
            const msg = (err instanceof ProgressEvent) ? 'API error. See console' : err.message;
            const notif = new Notification(msg, ENotificationType.ERROR);
            return new AddNotif(notif);
        })
    );

    constructor(
        private actions$: Actions,
        private _userService: UsersService,
    ) { }
}
