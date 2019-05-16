import { Action } from '@ngrx/store';

import { User } from '../models/User';
import { ActionWithPayload } from './app.actions';

export enum UserActions {
    getUserStart = '[User] get Start',
    getUserFinished = '[User] get Finished',
    getUserFailed = '[User] get Failed',
    addUser = '[User] add',
    updateUser = '[User] update',
    deleteUser = '[User] delete',
    resetUserState = '[User] reset State',
}


export class AddUser implements Action {
    readonly type = UserActions.addUser;
    constructor(public payload: User) {}
}

export class UpdateUser implements Action {
    readonly type = UserActions.updateUser;
    constructor(public payload: User) {}
}

export class DeleteUser implements Action {
    readonly type = UserActions.deleteUser;
    constructor(public payload: User) {}
}

export class GetUserStart implements Action {
    readonly type = UserActions.getUserStart;
    constructor(public payload: string) {}
}

export class GetUserFinished implements Action {
    readonly type = UserActions.getUserFinished;
    constructor(public payload: User) {}
}

export class GetUserFailed implements Action {
    readonly type = UserActions.getUserFailed;
    constructor(public payload: Error) {}
}

export class ResetUserState implements Action {
    readonly type = UserActions.resetUserState;
    constructor() {}
}
