import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { ActionWithPayload } from '../actions/app.actions';
import { EventlistActions, getEventListAsyncFinished, getEventListAsyncFailed } from '../actions/eventlist.actions';
import { EventsService } from '../event/services/events.service';

@Injectable()
export class EventlistEffects {

  @Effect()
  getEventlistAsyncStart$ = this.actions$
        .ofType(EventlistActions.getEventlistAsyncStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<string>;
            return act.payload;
        })
        .switchMap(payload => this._evtSrvc.fetchAll())
        .map(eventlist => getEventListAsyncFinished(eventlist))
        .catch((err: Error) => of(getEventListAsyncFailed(err))
    );

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions
    ) { }
}
