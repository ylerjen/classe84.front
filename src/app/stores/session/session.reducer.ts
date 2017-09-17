import { ActionReducer, Action } from '@ngrx/store';

import { SessionUser } from '../../models/SessionUser';
import { LOGIN, LOGOUT, SET_USER } from '../../actions/session.actions';

export interface ISessionState {
    isLoggedIn: boolean;
    loggedUser: SessionUser;
    token: string;
}

export const initialState: ISessionState = {
    isLoggedIn: false,
    loggedUser: null,
    token: ''
};

export function sessionReducer(state = initialState, action: Action): ISessionState {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                loggedUser: action.payload.loggedUser,
                token: action.payload.token
            });

        case LOGOUT:
            return initialState;

        case SET_USER:
            return Object.assign({}, state, {
                loggedUser: action.payload
            });

        default:
            return state;
    }
}
