
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ActionWithPayload } from '../actions/app.actions';
import { EventActions, GetEventFinished, GetEventFailed } from '../actions/event.actions';
import { addNotif } from '../actions/notifications.actions';
import { Notification } from '../models/Notification';
import { EventsService } from '../event/services/events.service';

@Injectable()
export class EventEffects {
    @Effect()
    getEventStart$ = this.actions$.pipe(
        ofType(EventActions.getEventStart),
        switchMap((action: Action) => {
            const act = action as ActionWithPayload<string>;
            const id = act.payload;
            return this._evtSrvc.get(id);
        }),
        map(event => new GetEventFinished(event)),
        catchError((err: Error) => of(new GetEventFailed(err)))
    );

    @Effect()
    getEventFailed$ = this.actions$.pipe(
        ofType(EventActions.getEventFailed),
        map((action: Action) => {
            const act = action as ActionWithPayload<Error>;
            this._router.navigate(['unauthorized']);
            const notif = new Notification(act.payload.name + ' : ' + act.payload.message);
            return addNotif(notif);
        }),
        catchError((err: Error) => of(new GetEventFailed(err)))
    );

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions,
        private _router: Router,
    ) { }
}
