import { Action } from '@ngrx/store';

import { User } from 'app/models/User';
import {
    ASYNC_USERLIST_START,
    ASYNC_USERLIST_FINISHED,
    ADD_USER_IN_USERLIST,
    DELETE_USER_FROM_USERLIST,
    EMPTY_USERLIST
} from 'app/actions/userlist.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

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
        {
            const act = action as ActionWithPayload<Array<User>>;
            return Object.assign({}, state, {
                isLoading: false,
                userList: act.payload.slice()
            });
        }

        case ADD_USER_IN_USERLIST:
        {
            const act = action as ActionWithPayload<User>;
            return Object.assign({}, state, {
                isLoading: false,
                userList: [
                    ...state.userList,
                    act.payload
                ]
            });
        }

        case DELETE_USER_FROM_USERLIST:
        {
         const act = action as ActionWithPayload<User>;
         return Object.assign({}, state, {
             isLoading: false,
             userList: state.userList.filter(
                 user => user.id !== act.payload.id
                )
            });
        }

        case EMPTY_USERLIST:
            return Object.assign({}, state, {
                isLoading: false,
                userList: []
            });

        default:
            return state;
    }
}
