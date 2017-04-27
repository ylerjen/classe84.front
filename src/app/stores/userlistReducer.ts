import { ActionReducer, Action } from '@ngrx/store';

import { User, EGender } from '../models/User';


export const LOAD_USER_START = 'LOAD_USER_START';
export const LOAD_USER = 'LOAD_USER';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const RESET = 'RESET';
export const EMPTY = 'EMPTY';

export interface UsersState {
    userList: User[];
    isLoading: boolean;
}

export function userlistReducer(state: User[] = [], action: Action) {
    switch (action.type) {
        case LOAD_USER:
            return action.payload.slice();

        case ADD_USER:
            return [
                ...state,
                action.payload
            ];

        case DELETE_USER:
            return state;

        case EMPTY:
            return [];

        default:
            return state;
    }
}
