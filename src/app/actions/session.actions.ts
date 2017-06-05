import { ActionReducer, Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_SIGNIN = 'REQUEST_SIGNIN';

export function login(payload: string): Action {
    return { type: LOGIN, payload };
}

export function logout(payload: any): Action {
    return { type: LOGOUT, payload };
}

export function requestSignIn(isRequested: boolean) {
    return { type: REQUEST_SIGNIN, payload: isRequested };
}
