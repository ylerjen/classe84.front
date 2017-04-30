import { ActionReducer, Action } from '@ngrx/store';

import { User, EGender } from '../models/User';
import { IUserState } from './IUserState';
import { ASYNC_USER_START, LOAD_USER_SUCCESS, ADD_USER, DELETE_USER, EMPTY } from '../actions/users.actions';


export const initialState: IUserState = {
    userList: [],
    isLoading: false,
    userFilter: ''
}

export function userlistReducer(state: IUserState = initialState, action: Action): IUserState {
    switch (action.type) {
        case ASYNC_USER_START:
            return Object.assign({}, state, {
                isLoading: true
            });

        case LOAD_USER_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                userList: action.payload.slice()
            });

        case ADD_USER:
            return Object.assign({}, state, {
                isLoading: false,
                userList: [
                    ...state.userList,
                    action.payload
                ]
            });

        case DELETE_USER:
            return Object.assign({}, state, {
                isLoading: false
            });

        case EMPTY:
            return Object.assign({}, state, {
                isLoading: false,
                userList: []
            });

        default:
            return state;
    }
}
