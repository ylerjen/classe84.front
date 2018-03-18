import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionWithPayload } from '../actions/app.actions';
import { UsersService } from 'app/user/services/users.service';
import { EventsService } from 'app/event/services/events.service';
import {
    getSubscriptionFinished,
    getSubscriptionFailed,
    SubscriptionActions,
    SubscriptionRqstCmd,
    SubscriptionType } from '../actions/subscription.actions';

@Injectable()
export class SubscriptionEffects {

  @Effect()
  getSubscrAsyncStart$ = this.actions$
        .ofType(SubscriptionActions.getSubscriptionListStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<SubscriptionRqstCmd>;
            return act.payload;
        })
        .switchMap((payload: SubscriptionRqstCmd) => {
            if (payload.type === SubscriptionType.User) {
                return this._userSrvc.getSubscriptions(payload.id);
            }
            return this._eventSrvc.getSubscribers(payload.id);
        })
        .map(subscrList => getSubscriptionFinished(subscrList))
        .catch((err: Error) => Observable.of(getSubscriptionFailed(err))
    );

    constructor(
        private _userSrvc: UsersService,
        private _eventSrvc: EventsService,
        private actions$: Actions
    ) { }
}
