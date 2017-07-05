import { Action } from '@ngrx/store';

import { User } from '../models/User';

export const ASYNC_USERLIST_START = 'ASYNC_USERLIST_START';
export const ASYNC_USERLIST_SUCCESS = 'ASYNC_USERLIST_SUCCESS';
export const ASYNC_USER_START = 'ASYNC_USER_START';
export const ASYNC_USER_SUCCESS = 'ASYNC_USER_SUCCESS';
export const GET_USER = 'GET_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const RESET = 'RESET';
export const EMPTY = 'EMPTY';
export const CHANGE_FILTER = 'CHANGE_FILTER';


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
