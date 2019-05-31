import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { User } from 'app/models/User';
import { UsersService } from 'app/user/services/users.service';
import { ActionWithPayload } from '@actions/app.actions';
import { UserlistActions, GetUserListAsyncFinished, GetUserListAsyncFailed } from '@actions/userlist.actions';

@Injectable()
export class UserlistEffects {
    @Effect()
    getUserStart$ = this.actions$.pipe(
        ofType(UserlistActions.GetListStart),
        switchMap(() => this._userService.fetchAll()),
        map((userList: Array<User>)  => {
            userList = userList.sort(User.sortByFullNameComparator);
            return new GetUserListAsyncFinished(userList);
        }),
        catchError((err: Error): Observable<ActionWithPayload<Error>> => of(new GetUserListAsyncFailed(err)))
    );

    constructor(
        private actions$: Actions,
        private _userService: UsersService,
    ) { }
}
