import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/delay';

import { Notification, DEFAULT_NOTIF_DURATION } from '@models/Notification';
import { ActionWithPayload } from '@actions/app.actions';
import { NotificationActions, deleteNotif } from '@actions/notifications.actions';

@Injectable()
export class NotificationEffects {

    @Effect()
    AddNotification$ = this.actions$
        .ofType(NotificationActions.AddNotification)
        .delay(DEFAULT_NOTIF_DURATION)
        .map((action: Action) => {
            const act = action as ActionWithPayload<Notification>;
            if (act.payload.isSelfDestructible) {
                return deleteNotif(act.payload);
            }
            return {type: '-'};
        });

    constructor(
        private actions$: Actions,
    ) { }
}
