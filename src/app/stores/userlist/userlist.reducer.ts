import { Action } from '@ngrx/store';

import { User } from '../../models/User';
import {
    ASYNC_USERLIST_START,
    ASYNC_USERLIST_FINISHED,
    ADD_USER_IN_USERLIST,
    DELETE_USER_FROM_USERLIST,
    EMPTY_USERLIST
} from '../../actions/userlist.actions';

export interface IUserListState {
    userList: User[];
    isLoading: boolean;
    userFilter: string;
}

export const initialState: IUserListState = {
    userList: [],
    isLoading: false,
    userFilter: ''
};

export function userlistReducer(state: IUserListState = initialState, action: Action): IUserListState {
    switch (action.type) {
        case ASYNC_USERLIST_START:
            return Object.assign({}, state, {
                isLoading: true
            });

        case ASYNC_USERLIST_FINISHED:
            return Object.assign({}, state, {
                isLoading: false,
                userList: action.payload.slice()
            });

        case ADD_USER_IN_USERLIST:
            return Object.assign({}, state, {
                isLoading: false,
                userList: [
                    ...state.userList,
                    action.payload
                ]
            });

        case DELETE_USER_FROM_USERLIST:
            return Object.assign({}, state, {
                isLoading: false,
                userList: state.userList.filter(user => user.id !== action.payload.id)
            });

        case EMPTY_USERLIST:
            return Object.assign({}, state, {
                isLoading: false,
                userList: []
            });

        default:
            return state;
    }
}
