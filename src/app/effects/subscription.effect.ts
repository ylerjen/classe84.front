import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionWithPayload } from '../actions/app.actions';
import { UsersService } from 'app/user/services/users.service';
import { getSubscriptionAsyncFinished, getSubscriptionAsyncFailed, SubscriptionActions } from '../actions/subscription.actions';

@Injectable()
export class SubscriptionEffects {

  @Effect()
  getSubscrAsyncStart$ = this.actions$
        .ofType(SubscriptionActions.getSubscriptionListAsyncStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<number>;
            return act.payload;
        })
        .switchMap(payload => this._userService.getSubscriptions(payload))
        .map(subscrList => getSubscriptionAsyncFinished(subscrList))
        .catch((err: Error) => Observable.of(getSubscriptionAsyncFailed(err))
    );

    constructor(
        private _userService: UsersService,
        private actions$: Actions
    ) { }
}
