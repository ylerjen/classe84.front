import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { ActionWithPayload } from '../actions/app.actions';
import { UsersService } from 'app/user/services/users.service';
import { EventsService } from 'app/event/services/events.service';
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
import { Subscription } from '../models/Subscription';

@Injectable()
export class SubscriptionEffects {

    @Effect()
    getSubscrStart$ = this.actions$
        .ofType(SubscriptionActions.getSubscriptionListStart)
        .switchMap((action: Action) => {
            const act = action as ActionWithPayload<FetchSubscriptionCmd>;
            if (act.payload.type === SubscriptionType.User) {
                return this._userSrvc.getSubscriptions(act.payload.id);
            }
            return this._eventSrvc.getSubscribers(act.payload.id);
        })
        .map(subscrList => getSubscriptionFinished(subscrList))
        .catch((err: Error) => of(getSubscriptionFailed(err))
    );

    @Effect()
    addSubscription$ = this.actions$
          .ofType(SubscriptionActions.addSubscription)
          .switchMap((action: Action) => {
              const act = action as ActionWithPayload<Subscription>;
              return this._eventSrvc.susbcribeToEvent(act.payload);
          })
          .map(subscrList => addSubscriptionFinished(subscrList))
          .catch((err: Error) => of(addSubscriptionFailed(err))
      );

      @Effect()
      deleteSubscription$ = this.actions$
            .ofType(SubscriptionActions.deleteSubscription)
            .switchMap((action: Action) => {
                const act = action as ActionWithPayload<Subscription>;
                return this._eventSrvc.unsubscribeFromEvent(act.payload);
            })
            .map(subscr => deleteSubscriptionFinished(subscr))
            .catch((err: Error) => of(deleteSubscriptionFailed(err))
        );

    constructor(
        private _userSrvc: UsersService,
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
