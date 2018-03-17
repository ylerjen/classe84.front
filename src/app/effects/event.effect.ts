import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionWithPayload } from '../actions/app.actions';
import { EventActions, getEventAsyncFinished, getEventAsyncFailed } from '../actions/event.actions';
import { EventsService } from '../event/services/events.service';

@Injectable()
export class EventEffects {

  @Effect()
  getEventAsyncStart$ = this.actions$
        .ofType(EventActions.getEventAsyncStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<string>;
            return act.payload;
        })
        .switchMap(payload => this._evtSrvc.get(payload))
        .map(event => getEventAsyncFinished(event))
        .catch((err: Error) => Observable.of(getEventAsyncFailed(err))
    );pe

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions
    ) { }
}
