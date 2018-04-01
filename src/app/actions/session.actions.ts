import { Action } from '@ngrx/store';

import { SessionUser } from '../models/SessionUser';
import { ActionWithPayload } from './app.actions';

export enum SessionActions {
    Login = '[Session] Login',
    Logout = '[Session] Logout',
    SetUser = '[Session] get Authenticated User',
    SetUserFinished = '[Session] Set User finished',
    SetUserFailed = '[Session] Set User failed',
}

export function login(payload: Object): ActionWithPayload<Object> {
    return { type: SessionActions.Login, payload };
}

export function logout(): Action {
    return { type: SessionActions.Logout };
}

export function setUser(): Action {
    return { type: SessionActions.SetUser };
}

export function setUserFinished(payload: SessionUser): ActionWithPayload<SessionUser> {
    return { type: SessionActions.SetUserFinished, payload };
}
