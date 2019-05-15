import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';

import { ActionWithPayload } from '../actions/app.actions';
import { UsersService } from 'app/user/services/users.service';
import { EventsService } from 'app/event/services/events.service';
import { Subscription } from '@models/Subscription';
import { ErrorWithContext } from '@models/ErrorWithContext';
import {
    getSubscriptionFinished,
    getSubscriptionFailed,
    SubscriptionActions,
    FetchSubscriptionCmd,
    SubscriptionType,
    addSubscriptionFinished,
    addSubscriptionFailed,
    deleteSubscriptionFinished,
    deleteSubscriptionFailed,
} from '../actions/subscription.actions';

@Injectable()
export class SubscriptionEffects {

    @Effect()
    getSubscrStart$ = this.actions$
        .ofType(SubscriptionActions.getSubscriptionListStart)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<FetchSubscriptionCmd>;
            return this._eventSrvc.getSubscribers(act.payload.id);
        })
        .map( (subscrList: Array<Subscription>) => getSubscriptionFinished(subscrList))
        .catch((err: Error) => of(getSubscriptionFailed(err)));

    @Effect()
    addSubscription$ = this.actions$
        .ofType(SubscriptionActions.addSubscription)
        .mergeMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.susbcribeToEvent(act.payload);
        })
        .map( (subscr: Subscription) => addSubscriptionFinished(subscr))
        .catch((errorWithContext: ErrorWithContext<Subscription>) => {
            const action = addSubscriptionFailed(errorWithContext);
            return of(action);
        });

    @Effect()
    deleteSubscription$ = this.actions$
        .ofType(SubscriptionActions.deleteSubscription)
        .mergeMap((action: Action) => {
            const act = action as ActionWithPayload<Subscription>;
            return this._eventSrvc.unsubscribeFromEvent(act.payload);
        })
        .map(subscr => deleteSubscriptionFinished(subscr))
        .catch((err: Error) => of(deleteSubscriptionFailed(err)));

    constructor(
        private _userSrvc: UsersService,
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
