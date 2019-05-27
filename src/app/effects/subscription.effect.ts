import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';

import { ActionWithPayload } from '../actions/app.actions';
import { EventsService } from 'app/event/services/events.service';
import { Subscription } from '@models/Subscription';
import { ErrorWithContext } from '@models/ErrorWithContext';
import {
    GetSubscriptionFinished,
    GetSubscriptionFailed,
    SubscriptionActions,
    AddSubscriptionFinished,
    AddSubscriptionFailed,
    DeleteSubscriptionFinished,
    DeleteSubscriptionFailed,
} from '../actions/subscription.actions';

@Injectable()
export class SubscriptionEffects {

    @Effect()
    getSubscrStart$ = this.actions$
        .ofType(SubscriptionActions.getSubscriptionListStart)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<string>;
            return this._eventSrvc.getSubscribers(act.payload);
        })
        .map( (subscrList: Array<Subscription>) => new GetSubscriptionFinished(subscrList))
        .catch((err: Error) => of(new GetSubscriptionFailed(err)));

    @Effect()
    addSubscription$ = this.actions$
        .ofType(SubscriptionActions.addSubscription)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.susbcribeToEvent(act.payload);
        })
        .map( (subscr: Subscription) => new AddSubscriptionFinished(subscr))
        .catch((errorWithContext: ErrorWithContext<Subscription>) => {
            const action = new AddSubscriptionFailed(errorWithContext);
            return of(action);
        });

    @Effect()
    deleteSubscription$ = this.actions$
        .ofType(SubscriptionActions.deleteSubscription)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.unsubscribeFromEvent(act.payload);
        })
        .map(subscr => new DeleteSubscriptionFinished(subscr))
        .catch((err: Error) => of(new DeleteSubscriptionFailed(err)));

    constructor(
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
