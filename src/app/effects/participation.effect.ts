import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';

import { ActionWithPayload } from '../actions/app.actions';
import { EventsService } from 'app/event/services/events.service';
import { Subscription } from '@models/Subscription';
import { ErrorWithContext } from '@models/ErrorWithContext';
import {
    ParticipationActions,
    GetParticipationListFinished,
    GetParticipationListFailed,
    AddParticipationFinished,
    AddParticipationFailed,
    DeleteParticipationFinished,
    DeleteParticipationFailed
} from '../actions/participations.actions';
import { UsersService } from 'app/user/services/users.service';

@Injectable()
export class ParticipationEffects {

    @Effect()
    getParticipationStart$ = this.actions$.pipe(
        ofType(ParticipationActions.getParticipationListStart),
        switchMap((action: Action) => {
            const act = action as ActionWithPayload<string>;
            return this._usersSrvc.getParticipations(act.payload);
        }),
        map((subscrList: Array<Subscription>) => new GetParticipationListFinished(subscrList)),
        catchError((err: Error) => of(new GetParticipationListFailed(err)))
    );

    @Effect()
    addSubscription$ = this.actions$.pipe(
        ofType(ParticipationActions.addParticipation),
        concatMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.susbcribeToEvent(act.payload);
        }),
        map((subscr: Subscription) => new AddParticipationFinished(subscr)),
        catchError((errorWithContext: ErrorWithContext<Subscription>) => {
            const action = new AddParticipationFailed(errorWithContext);
            return of(action);
        })
    );

    @Effect()
    deleteSubscription$ = this.actions$.pipe(
        ofType(ParticipationActions.deleteParticipation),
        concatMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.unsubscribeFromEvent(act.payload);
        }),
        map((subscr: Subscription) => new DeleteParticipationFinished(subscr)),
        catchError((err: Error) => of(new DeleteParticipationFailed(err)))
    );

    constructor(
        private _usersSrvc: UsersService,
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
