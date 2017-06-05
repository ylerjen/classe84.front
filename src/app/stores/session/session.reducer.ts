import { ActionReducer, Action } from '@ngrx/store';

import { LOGIN, LOGOUT, REQUEST_SIGNIN } from '../../actions/session.actions';

export interface ISessionUser {
    firstname: string;
    lastname: string;
    email: string;
    loginTime: Date;
}

export interface ISessionState {
    requestSignIn: boolean;
    isLoggedIn: boolean;
    loggedUser: ISessionUser;
    token: string;
}

export const initialState: ISessionState = {
    requestSignIn: false,
    isLoggedIn: false,
    loggedUser: null,
    token: ''
};

export function sessionReducer(state = initialState, action: Action): ISessionState {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                requestSignIn: true,
                isLoggedIn: true,
                loggedUser: action.payload.loggedUser,
                token: action.payload.token
            });

        case LOGOUT:
            return initialState;

        case REQUEST_SIGNIN:
            return Object.assign({}, state, { requestSignIn: action.payload });

        default:
            return state;
    }
}
