import { ActionReducer, Action } from '@ngrx/store';

import { SessionUser } from '../models/SessionUser';

export const LOGIN = 'SESSION_ACTION_LOGIN';
export const LOGOUT = 'SESSION_ACTION_LOGOUT';
export const SET_USER = 'SESSION_ACTION_SET_USER';

export function login(payload: Object): Action {
    return { type: LOGIN, payload };
}

export function logout(): Action {
    return { type: LOGOUT };
}

export function setUser(payload: SessionUser): Action {
    return { type: SET_USER, payload };
}
