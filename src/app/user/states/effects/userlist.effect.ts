import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { catchError, switchMap, map, withLatestFrom } from 'rxjs/operators';

import { User } from '@models/User';
import { UsersService } from 'app/user/services/users.service';
import { UserlistActionTypes, GetUserListAsyncFinished, GetUserListAsyncFailed, GetUserListAsync } from 'app/user/states/actions/userlist.actions';
import { UserListState } from 'app/user/states/reducers/userlist/userlist.reducer';
import { UserModuleState } from 'app/user/states/user.state';

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
        private store$: Store<UserModuleState>,
    ) { }
}
