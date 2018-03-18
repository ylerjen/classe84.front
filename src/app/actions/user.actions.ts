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


export function addUser(payload: User): ActionWithPayload<User> {
    return {
        type: UserActions.addUser,
        payload
    };
}

export function updateUser(payload: User): ActionWithPayload<User> {
    return {
        type: UserActions.updateUser,
        payload
    };
}

export function deleteUser(payload: User): ActionWithPayload<User> {
    return {
        type: UserActions.deleteUser,
        payload
    };
}

export function getUserStart(payload: string): ActionWithPayload<string> {
    return {
        type: UserActions.getUserStart,
        payload
    };
}

export function getUserFinished(payload: User): ActionWithPayload<User> {
    return {
        type: UserActions.getUserFinished,
        payload
    };
}

export function getUserFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: UserActions.getUserFailed,
        payload
    };
}

export function resetUserState(): Action {
    return {
        type: UserActions.resetUserState
    };
}
