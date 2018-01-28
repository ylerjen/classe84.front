import { Action } from '@ngrx/store';

import { User } from '../models/User';

export const ASYNC_USER_START = 'ASYNC_USER_START';
export const ASYNC_USER_FINISHED = 'ASYNC_USER_FINISHED';
export const GET_USER = 'USER_GET';
export const ADD_USER = 'USER_ADD';
export const UPDATE_USER = 'USER_UPDATE';
export const DELETE_USER = 'USER_DELETE';
export const RESET_USER_STATE = 'RESET_USER_STATE';


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

export function getUserAsyncStart(): Action {
    return {
        type: ASYNC_USER_START
    };
}

export function getUserAsyncFinished(payload: User): Action {
    return {
        type: ASYNC_USER_FINISHED,
        payload
    };
}

export function resetUserState(): Action {
    return {
        type: RESET_USER_STATE
    };
}
