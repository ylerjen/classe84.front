import { Action } from '@ngrx/store';

import { User } from '../models/User';
import { ActionWithPayload } from './app.actions';

export enum UserActions {
    getUserAsyncStart = '[User] get Async Start',
    getUserAsyncFinished = '[User] get Async Finished',
    getUserAsyncFailed = '[User] get Async Failed',
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

export function getUserAsyncStart(payload: number): ActionWithPayload<number> {
    return {
        type: UserActions.getUserAsyncStart,
        payload
    };
}

export function getUserAsyncFinished(payload: User): ActionWithPayload<User> {
    return {
        type: UserActions.getUserAsyncFinished,
        payload
    };
}

export function getUserAsyncFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: UserActions.getUserAsyncFailed,
        payload
    };
}

export function resetUserState(): Action {
    return {
        type: UserActions.resetUserState
    };
}
