import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionWithPayload } from '../actions/app.actions';
import { UsersService } from 'app/user/services/users.service';
import { getUserAsyncFinished, getUserAsyncFailed, UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {

  @Effect()
  getUserAsyncStart$ = this.actions$
        .ofType(UserActions.getUserAsyncStart)
        .map((action: Action) => {
            const act = action as ActionWithPayload<number>;
            return act.payload;
        })
        .switchMap(payload => this._userService.get(payload))
        .map(user => getUserAsyncFinished(user))
        .catch((err: Error) => Observable.of(getUserAsyncFailed(err))
    );

    constructor(
        private _userService: UsersService,
        private actions$: Actions
    ) { }
}
