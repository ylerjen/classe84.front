import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { catchError, switchMap, map, withLatestFrom } from 'rxjs/operators';

import { User } from 'app/models/User';
import { UsersService } from 'app/user/services/users.service';
import { UserlistActionTypes, GetUserListAsyncFinished, GetUserListAsyncFailed, GetUserListAsync } from '@actions/userlist.actions';
import { Store } from '@ngrx/store';
import { UserListState } from 'app/stores/userlist/userlist.reducer';
import { GlobalState } from 'app/stores/globalState';

@Injectable()
export class UserlistEffects {
    @Effect()
    getUserList$ = this.actions$.pipe(
        ofType(UserlistActionTypes.GetListStart),
        withLatestFrom(this.store$.select(s => s.userlistState)),
        switchMap(([, state]: [GetUserListAsync, UserListState]) => {
            return this._userService.fetchAll().pipe(
                map((userList: Array<User>)  => {
                    userList = userList.sort(User.sortByFullNameComparator);
                    return new GetUserListAsyncFinished(userList);
                }),
                catchError((err: Error): Observable<GetUserListAsyncFailed> => of(new GetUserListAsyncFailed(err)))
            );
        }),
    );

    constructor(
        private actions$: Actions,
        private _userService: UsersService,
        private store$: Store<GlobalState>,
    ) { }
}
