import { Action } from '@ngrx/store';

import { User } from '../models/User';

export enum UserActionTypes {
    getUserStart = '[User] get Start',
    getUserFinished = '[User] get Finished',
    getUserFailed = '[User] get Failed',
    addUser = '[User] add',
    updateUser = '[User] update',
    deleteUser = '[User] delete',
    resetUserState = '[User] reset State',
}


export class AddUser implements Action {
    readonly type = UserActionTypes.addUser;
    constructor(public payload: User) {}
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.updateUser;
    constructor(public payload: User) {}
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.deleteUser;
    constructor(public payload: User) {}
}

export class GetUserStart implements Action {
    readonly type = UserActionTypes.getUserStart;
    constructor(public payload: string) {}
}

export class GetUserFinished implements Action {
    readonly type = UserActionTypes.getUserFinished;
    constructor(public payload: User) {}
}

export class GetUserFailed implements Action {
    readonly type = UserActionTypes.getUserFailed;
    constructor(public payload: Error) {}
}

export class ResetUserState implements Action {
    readonly type = UserActionTypes.resetUserState;
    constructor() {}
}

export type UserActions = AddUser
    | UpdateUser
    | DeleteUser
    | GetUserStart
    | GetUserFinished
    | GetUserFailed
    | ResetUserState;
