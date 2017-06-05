import { ActionReducer, Action } from '@ngrx/store';

import { User, EGender } from '../../models/User';
import { ASYNC_USERLIST_START, ASYNC_USERLIST_SUCCESS, ADD_USER, DELETE_USER, EMPTY } from '../../actions/users.actions';

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

        case ASYNC_USERLIST_SUCCESS:
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
