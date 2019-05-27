import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';

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
    getParticipationStart$ = this.actions$
        .ofType(ParticipationActions.getParticipationListStart)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<string>;
            return this._usersSrvc.getParticipations(act.payload);
        })
        .map( (subscrList: Array<Subscription>) => new GetParticipationListFinished(subscrList))
        .catch((err: Error) => of(new GetParticipationListFailed(err)));

    @Effect()
    addSubscription$ = this.actions$
        .ofType(ParticipationActions.addParticipation)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.susbcribeToEvent(act.payload);
        })
        .map( (subscr: Subscription) => new AddParticipationFinished(subscr))
        .catch((errorWithContext: ErrorWithContext<Subscription>) => {
            const action = new AddParticipationFailed(errorWithContext);
            return of(action);
        });

    @Effect()
    deleteSubscription$ = this.actions$
        .ofType(ParticipationActions.deleteParticipation)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.unsubscribeFromEvent(act.payload);
        })
        .map(subscr => new DeleteParticipationFinished(subscr))
        .catch((err: Error) => of(new DeleteParticipationFailed(err)));

    constructor(
        private _usersSrvc: UsersService,
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
