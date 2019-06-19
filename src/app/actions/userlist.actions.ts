import { Action } from '@ngrx/store';

import { User } from '../models/User';

export enum UserlistActionTypes {
    GetListStart = '[Userlist] get start',
    GetListFinished = '[Userlist] get finished',
    GetListFailed = '[Userlist] get failed',
    ResetState = '[Userlist] reset state',
    AddUserInList = '[Userlist] add',
    DeleteUserFromList = '[Userlist] delete',
    ChangeFilter = '[Userlist] change filter',
}

export class ChangeFilter implements Action {
    readonly type = UserlistActionTypes.ChangeFilter;
    constructor(public payload: string) {}
}

export class GetUserListAsync implements Action {
    readonly type = UserlistActionTypes.GetListStart;
}

export class GetUserListAsyncFinished implements Action {
    readonly type = UserlistActionTypes.GetListFinished;
    constructor(public payload: Array<User>) {}
}

export class GetUserListAsyncFailed implements Action {
    readonly type = UserlistActionTypes.GetListFailed;
    constructor(public payload: Error) {}
}

export class AddUserInList implements Action {
    readonly type = UserlistActionTypes.AddUserInList;
    constructor(public payload: User) {}
}

export class DeleteUserFromList implements Action {
    readonly type = UserlistActionTypes.DeleteUserFromList;
    constructor(public payload: User) {}
}

export class EmptyUserList implements Action {
    readonly type = UserlistActionTypes.ResetState;
}

export type UserlistActions = ChangeFilter
    | GetUserListAsync
    | GetUserListAsyncFinished
    | GetUserListAsyncFailed
    | AddUserInList
    | DeleteUserFromList
    | EmptyUserList;
