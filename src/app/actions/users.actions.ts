import { Action } from '@ngrx/store';

import { User } from '../models/User';
import { ASYNC_EVENT_SUCCESS } from 'app/actions/events.actions';

export const ASYNC_USERLIST_START = 'ASYNC_USERLIST_START';
export const ASYNC_USERLIST_SUCCESS = 'ASYNC_USERLIST_SUCCESS';
export const ASYNC_USER_START = 'ASYNC_USER_START';
export const ASYNC_USER_SUCCESS = 'ASYNC_USER_SUCCESS';
export const GET_USER = 'USER_GET';
export const ADD_USER = 'USER_ADD';
export const UPDATE_USER = 'USER_UPDATE';
export const DELETE_USER = 'USER_DELETE';
export const RESET = 'USERLIST_RESET';
export const EMPTY = 'USERLIST_EMPTY';
export const CHANGE_FILTER = 'USERLIST_CHANGE_FILTER';


export function addUser(payload: User): Action {
    return {
        type: ADD_USER,
        payload
    };
}

export function updateUser(payload: User): Action {
    return {
        type: UPDATE_USER,
        payload
    };
}

export function deleteUser(payload: User): Action {
    return {
        type: DELETE_USER,
        payload
    };
}

export function changeFilter(payload: string): Action {
    return {
        type: CHANGE_FILTER,
        payload
    };
}

export function getUserAsync(): Action {
    return {
        type: ASYNC_USER_START
    };
}

export function getUserAsyncSuccess(payload: User): Action {
    return {
        type: ASYNC_USER_SUCCESS,
        payload
    };
}

export function getUserListAsync(): Action {
    return {
        type: ASYNC_USERLIST_START
    };
}

export function getUserListAsyncSuccess(payload: Array<User>): Action {
    return {
        type: ASYNC_USERLIST_SUCCESS,
        payload
    }
}