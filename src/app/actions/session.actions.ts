import { Action } from '@ngrx/store';

import { Session } from '../models/Session';
import { Login } from '../models/Login';
import { ActionWithPayload } from './app.actions';

export enum SessionActions {
    Login = '[Session] Login',
    Logout = '[Session] Logout',
    LoginFinished = '[Session] Login finished',
    LoginFailed = '[Session] Login failed',
    LogoutFinished = '[Session] Logout finished',
    LogoutFailed = '[Session] Logout failed',
    SetExistingSession = '[Session] set Authenticated User',
}

export function login(payload: Login, successCb?: Function, errCb?: Function): ActionWithPayload<Login> {
    console.warn('manage successCb and errCb');
    return { type: SessionActions.Login, payload };
}

export function loginFinished(payload: Session): ActionWithPayload<Session> {
    return { type: SessionActions.LoginFinished, payload };
}

export function loginFailed(payload: Error): ActionWithPayload<Error> {
    return { type: SessionActions.LoginFailed, payload };
}

export function logout(): Action {
    return { type: SessionActions.Logout };
}

export function logoutFinished(): Action {
    return { type: SessionActions.LogoutFinished };
}

export function logoutFailed(payload: Error): ActionWithPayload<Error> {
    return { type: SessionActions.LogoutFailed, payload };
}

export function setExistingSession(payload: Session): ActionWithPayload<Session> {
    return { type: SessionActions.SetExistingSession, payload };
}
