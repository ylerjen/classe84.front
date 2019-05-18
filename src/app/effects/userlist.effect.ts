import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import { ActionWithPayload } from '@actions/app.actions';
import { User } from 'app/models/User';
import { UsersService } from 'app/user/services/users.service';
import { UserlistActions, GetUserListAsyncFinished, GetUserListAsyncFailed } from '@actions/userlist.actions';

@Injectable()
export class UserlistEffects {
    @Effect()
    getUserStart$ = this.actions$
        .ofType(UserlistActions.GetListStart)
        .switchMap(() => this._userService.fetchAll())
        .map((userList: Array<User>)  => {
            userList = userList.sort(User.sortByFullNameComparator);
            return new GetUserListAsyncFinished(userList);
        })
        .catch((err: Error): Observable<ActionWithPayload<Error>> => of(new GetUserListAsyncFailed(err)));

    constructor(
        private actions$: Actions,
        private _userService: UsersService,
    ) { }
}
