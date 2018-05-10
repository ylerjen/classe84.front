import { Action } from '@ngrx/store';

import { Session } from '../models/Session';
import { Login, PasswordChangeObject, PasswordRecoveryObject } from '../models/Login';
import { ActionWithPayload } from './app.actions';

export enum SessionActions {
    Login = '[Session] Login',
    Logout = '[Session] Logout',
    LoginFinished = '[Session] Login finished',
    LoginFailed = '[Session] Login failed',
    LogoutFinished = '[Session] Logout finished',
    LogoutFailed = '[Session] Logout failed',
    SetExistingSession = '[Session] set Authenticated User',
    SendPasswordRecoveryMail = 'sendPasswordRecoveryMail',
    ChangePassword = 'ChangePassword',
    ChangePasswordFromRecovery = 'ChangePasswordFromRecovery',
}

export function login(payload: Login): ActionWithPayload<Login> {
    return { type: SessionActions.Login, payload };
}

export class LoginFinishedAction implements Action {
    public readonly type = SessionActions.LoginFinished;
    constructor(public payload: Session) { }
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

// Action for effects only (no data in store)

export function sendPasswordRecoveryMail(payload: string): ActionWithPayload<string> {
    return { type: SessionActions.SendPasswordRecoveryMail, payload };
}

export function changePassword(payload: PasswordChangeObject): ActionWithPayload<PasswordChangeObject> {
    return { type: SessionActions.ChangePassword, payload };
}

export function changePasswordFromRecovery(payload: PasswordRecoveryObject): ActionWithPayload<PasswordRecoveryObject> {
    return { type: SessionActions.ChangePasswordFromRecovery, payload };
}
