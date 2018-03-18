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


export function changeFilter(payload: string): ActionWithPayload<string> {
    return {
        type: UserlistActions.ChangeFilter,
        payload
    };
}

export function getUserListAsync(): Action {
    return {
        type: UserlistActions.GetListStart
    };
}

export function getUserListAsyncFinished(payload: Array<User>): ActionWithPayload<Array<User>> {
    return {
        type: UserlistActions.GetListFinished,
        payload
    }
}

export function addUserInList(payload: User): ActionWithPayload<User> {
    return {
        type: UserlistActions.AddUserInList,
        payload
    };
}

export function deleteUserFromList(payload: User): ActionWithPayload<User> {
    return {
        type: UserlistActions.DeleteUserFromList,
        payload
    };
}

export function emptyUserList(): Action {
    return { type: UserlistActions.ResetState };
}
