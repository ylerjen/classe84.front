import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { EventlistActionTypes, GetEventListAsyncFinished, GetEventListAsyncFailed } from '../actions/eventlist.actions';
import { EventsService } from '../../services/events.service';

@Injectable()
export class EventlistEffects {

  @Effect()
  getEventlistAsyncStart$ = this.actions$.pipe(
        ofType(EventlistActionTypes.getEventlistAsyncStart),
        switchMap((action: Action) => this._evtSrvc.fetchAll()),
        map(eventlist => new GetEventListAsyncFinished(eventlist)),
        catchError((err: Error) => of(new GetEventListAsyncFailed(err)))
    );

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions
    ) { }
}
