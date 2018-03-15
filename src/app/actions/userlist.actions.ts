import { Action } from '@ngrx/store';

import { User } from '../models/User';
import { ActionWithPayload } from './app.actions';

export const ASYNC_USERLIST_START = 'ASYNC_USERLIST_START';
export const ASYNC_USERLIST_FINISHED = 'ASYNC_USERLIST_FINISHED';
export const EMPTY_USERLIST = 'EMPTY_USERLIST';
export const ADD_USER_IN_USERLIST = 'ADD_USER_IN_USERLIST';
export const DELETE_USER_FROM_USERLIST = 'DELETE_USER_FROM_USERLIST';
export const CHANGE_USERLIST_FILTER = 'CHANGE_USERLIST_FILTER';


export function changeFilter(payload: string): ActionWithPayload<string> {
    return {
        type: CHANGE_USERLIST_FILTER,
        payload
    };
}

export function getUserListAsync(): Action {
    return {
        type: ASYNC_USERLIST_START
    };
}

export function getUserListAsyncFinished(payload: Array<User>): ActionWithPayload<Array<User>> {
    return {
        type: ASYNC_USERLIST_FINISHED,
        payload
    }
}

export function addUserInList(payload: User): ActionWithPayload<User> {
    return {
        type: ADD_USER_IN_USERLIST,
        payload
    };
}

export function deleteUserFromList(payload: User): ActionWithPayload<User> {
    return {
        type: DELETE_USER_FROM_USERLIST,
        payload
    };
}

export function emptyUserList(): Action {
    return { type: EMPTY_USERLIST };
}
