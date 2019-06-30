
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, delay } from 'rxjs/operators';


import { DEFAULT_NOTIF_DURATION } from '@models/Notification';
import { NotificationActions, DeleteNotif, AddNotif } from '@actions/notifications.actions';

@Injectable()
export class NotificationEffects {

    @Effect()
    AddNotification$ = this.actions$.pipe(
        ofType(NotificationActions.AddNotification),
        delay(DEFAULT_NOTIF_DURATION),
        map((action: Action) => {
            const act = action as AddNotif;
            if (act.payload.isSelfDestructible) {
                return new DeleteNotif(act.payload);
            }
            return {type: '-'};
        }));

    constructor(
        private actions$: Actions,
    ) { }
}
