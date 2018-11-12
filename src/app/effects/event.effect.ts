import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { ActionWithPayload } from '../actions/app.actions';
import { EventActions, getEventFinished, getEventFailed } from '../actions/event.actions';
import { addNotif } from '../actions/notifications.actions';
import { Notification } from '../models/Notification';
import { EventsService } from '../event/services/events.service';
import { Router } from '@angular/router';

@Injectable()
export class EventEffects {

  @Effect()
  getEventStart$ = this.actions$
        .ofType(EventActions.getEventStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<string>;
            return act.payload;
        })
        .switchMap(payload => this._evtSrvc.get(payload))
        .map(event => getEventFinished(event))
        .catch((err: Error) => of(getEventFailed(err))
    );

    @Effect()
    getEventFailed$ = this.actions$
        .ofType(EventActions.getEventFailed)
        .map((action: Action) => {
            const act = action as ActionWithPayload<Error>;
            this._router.navigate(['unauthorized']);
            const notif = new Notification(act.payload.name + ' : ' + act.payload.message);
            return addNotif(notif);
        })
        .catch((err: Error) => of(getEventFailed(err))
    );

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions,
        private _router: Router,
    ) { }
}
