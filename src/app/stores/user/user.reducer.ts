import { Action } from '@ngrx/store';

import { User } from 'app/models/User';
import {
    GET_USER,
    ASYNC_USER_START,
    ASYNC_USER_FINISHED,
    UPDATE_USER,
    DELETE_USER,
    RESET_USER_STATE
} from 'app/actions/user.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface IUserState {
    user: User;
    isLoading: boolean;
}

export const initialState: IUserState = {
    user: undefined,
    isLoading: false
};

export function userReducer(state: IUserState = initialState, action: Action): IUserState {
    switch (action.type) {
        case GET_USER:
        {
            const act = action as ActionWithPayload<User>;
            return Object.assign({}, state, { user: act.payload });
        }

        case ASYNC_USER_START:
            return Object.assign({}, state, { isLoading: true });

        case ASYNC_USER_FINISHED:
        {
            const act = action as ActionWithPayload<User>;
            return Object.assign({}, state, { user: act.payload, isLoading: false });
        }

        case UPDATE_USER:
        {
            const act = action as ActionWithPayload<User>;
            return Object.assign({}, state, { user: act.payload });
        }

        case DELETE_USER:
            return Object.assign({}, state, { user: undefined });

        case RESET_USER_STATE:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}
