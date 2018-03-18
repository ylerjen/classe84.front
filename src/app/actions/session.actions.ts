import { Action } from '@ngrx/store';

import { SessionUser } from '../models/SessionUser';
import { ActionWithPayload } from './app.actions';

export enum SessionActions {
    Login = '[Session] Login',
    Logout = '[Session] Logout',
    SetUser = '[Session] Set User',
}

export function login(payload: Object): ActionWithPayload<Object> {
    return { type: SessionActions.Login, payload };
}

export function logout(): Action {
    return { type: SessionActions.Logout };
}

export function setUser(payload: SessionUser): ActionWithPayload<SessionUser> {
    return { type: SessionActions.SetUser, payload };
}
