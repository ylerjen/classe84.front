import { ActionReducer, Action } from '@ngrx/store';

import { User, EGender } from '../../models/User';
import { GET_USER, ASYNC_USER_START, ASYNC_USER_SUCCESS } from '../../actions/users.actions';

export interface IUserState {
    user: User;
    isLoading: boolean;
}

const initialState: IUserState = {
    user: new User(),
    isLoading: false
};

export function userReducer(state: IUserState = initialState, action: Action): IUserState {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, { user: action.payload });

        case ASYNC_USER_START:
            return Object.assign({}, state, { isLoading: true });

        case ASYNC_USER_SUCCESS:
            return Object.assign({}, state, { user: action.payload, isLoading: false });
    }
}
