import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionWithPayload } from '../actions/app.actions';
import { UsersService } from 'app/user/services/users.service';
import { getUserFinished, getUserFailed, UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {

  @Effect()
  getUserAsyncStart$ = this.actions$
        .ofType(UserActions.getUserStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<number>;
            return act.payload;
        })
        .switchMap(payload => this._userService.get(payload))
        .map(user => getUserFinished(user))
        .catch((err: Error) => Observable.of(getUserFailed(err))
    );

    constructor(
        private _userService: UsersService,
        private actions$: Actions
    ) { }
}
