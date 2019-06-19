import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';

import { EventsService } from 'app/event/services/events.service';
import { Subscription } from '@models/Subscription';
import { ErrorWithContext } from '@models/ErrorWithContext';
import {
    GetSubscriptionFinished,
    GetSubscriptionFailed,
    SubscriptionActionTypes,
    AddSubscriptionFinished,
    AddSubscriptionFailed,
    DeleteSubscriptionFinished,
    DeleteSubscriptionFailed,
    GetSubscriptionStart,
    AddSubscription,
    DeleteSubscription,
    SubscriptionActions,
} from '../actions/subscription.actions';

@Injectable()
export class SubscriptionEffects {

    @Effect()
    getSubscrStart$ = this.actions$.pipe(
        ofType(SubscriptionActionTypes.getSubscriptionListStart),
        switchMap((action: Action) => {
            const act = action as GetSubscriptionStart;
            return this._eventSrvc.getSubscribers(act.payload);
        }),
        map((subscrList: Array<Subscription>) => new GetSubscriptionFinished(subscrList)),
        catchError((err: Error) => of(new GetSubscriptionFailed(err)))
    );

    @Effect()
    addSubscription$ = this.actions$.pipe(
        ofType(SubscriptionActionTypes.addSubscription),
        mergeMap((action: Action) => {
            const act = action as AddSubscription;
            return this._eventSrvc.susbcribeToEvent(act.payload);
        }),
        map( (subscr: Subscription) => new AddSubscriptionFinished(subscr)),
        catchError((errorWithContext: ErrorWithContext<Subscription>) => {
            const action = new AddSubscriptionFailed(errorWithContext);
            return of(action);
        })
    );

    @Effect()
    deleteSubscription$ = this.actions$.pipe(
        ofType(SubscriptionActionTypes.deleteSubscription),
        mergeMap((action: SubscriptionActions) => {
            const act = action as DeleteSubscription;
            return this._eventSrvc.unsubscribeFromEvent(act.payload);
        }),
        map(subscr => new DeleteSubscriptionFinished(subscr)),
        catchError((err: ErrorWithContext<Subscription>) => of(new DeleteSubscriptionFailed(err)))
    );

    constructor(
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
