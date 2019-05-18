import { Action } from '@ngrx/store';

import { User } from '../models/User';
import { ActionWithPayload } from './app.actions';

export enum UserlistActions {
    GetListStart = '[Userlist] get start',
    GetListFinished = '[Userlist] get finished',
    GetListFailed = '[Userlist] get failed',
    ResetState = '[Userlist] reset state',
    AddUserInList = '[Userlist] add',
    DeleteUserFromList = '[Userlist] delete',
    ChangeFilter = '[Userlist] change filter',
}


export class ChangeFilter implements Action {
    readonly type = UserlistActions.ChangeFilter;
    constructor(public payload: string) {}
}

export class GetUserListAsync implements Action {
    readonly type = UserlistActions.GetListStart;
}

export class GetUserListAsyncFinished implements Action {
    readonly type = UserlistActions.GetListFinished;
    constructor(public payload: Array<User>) {}
}

export class GetUserListAsyncFailed implements Action {
    readonly type = UserlistActions.GetListFailed;
    constructor(public payload: Error) {}
}

export class AddUserInList implements Action {
    readonly type = UserlistActions.AddUserInList;
    constructor(public payload: User) {}
}

export class DeleteUserFromList implements Action {
    readonly type = UserlistActions.DeleteUserFromList;
    constructor(public payload: User) {}
}

export class EmptyUserList implements Action {
    readonly type = UserlistActions.ResetState;
}
