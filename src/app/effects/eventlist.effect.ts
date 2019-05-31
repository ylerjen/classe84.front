import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { EventlistActions, getEventListAsyncFinished, getEventListAsyncFailed } from '../actions/eventlist.actions';
import { EventsService } from '../event/services/events.service';

@Injectable()
export class EventlistEffects {

  @Effect()
  getEventlistAsyncStart$ = this.actions$.pipe(
        ofType(EventlistActions.getEventlistAsyncStart),
        switchMap((action: Action) => this._evtSrvc.fetchAll()),
        map(eventlist => getEventListAsyncFinished(eventlist)),
        catchError((err: Error) => of(getEventListAsyncFailed(err)))
    );

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions
    ) { }
}
