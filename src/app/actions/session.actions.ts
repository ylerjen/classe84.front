import { Action } from '@ngrx/store';

import { Session } from '../models/Session';
import { Login, PasswordChangeObject, PasswordRecoveryObject } from '../models/Login';
import { ActionWithPayload } from './app.actions';
import { User } from '@models/User';

export enum SessionActions {
    Login = '[Session] Login',
    Logout = '[Session] Logout',
    LoginFinished = '[Session] Login finished',
    LoginFailed = '[Session] Login failed',
    FetchUser = '[Session] Fetch logged user',
    FetchUserFailed = '[Session] Fetch logged user failed',
    FetchUserFinished = '[Session] Fetch logged user finished',
    LogoutFinished = '[Session] Logout finished',
    LogoutFailed = '[Session] Logout failed',
    SetExistingSession = '[Session] set Authenticated User',
    SendPasswordRecoveryMail = '[Session] sendPasswordRecoveryMail',
    ChangePassword = '[Session] ChangePassword',
    ChangePasswordFromRecovery = '[Session] ChangePasswordFromRecovery',
    AddFormErrors = '[Session] add form errors',
    EmptyFormErrors = '[Session] empty form errors',
    SessionExpired = '[Session] expired',
}

export class AddFormErrorsAction implements Action {
    readonly type = SessionActions.AddFormErrors;
    public payload: Array<string> = [];
    constructor(...payload) {
        this.payload = payload;
    }
}

export class EmptyFormErrorsAction implements Action {
    readonly type = SessionActions.EmptyFormErrors;
}

export class LoginAction implements Action {
    readonly type = SessionActions.Login;
    constructor(public payload: Login) { }
}

export class LoginFinishedAction implements Action {
    readonly type = SessionActions.LoginFinished;
    constructor(public payload: Session) { }
}

export class LoginFailedAction implements Action {
    readonly type = SessionActions.LoginFailed;
    constructor(public payload: Error) { }
}

export class FetchLoggedUserAction implements Action {
    readonly type = SessionActions.FetchUser;
}

export class FetchLoggedUserFinishedAction implements Action {
    readonly type = SessionActions.FetchUserFinished;
    constructor(public payload: User) { }
}

export class FetchLoggedUserFailedAction implements Action {
    readonly type = SessionActions.FetchUserFailed;
    constructor(public payload: Error) { }
}

export class LogoutAction implements Action {
    readonly type = SessionActions.Logout;
}

export class LogoutFinishedAction implements Action {
    readonly type = SessionActions.LogoutFinished;
}

export class LogoutFailedAction implements Action {
    readonly type = SessionActions.LogoutFailed;
    constructor(public payload: Error) { }
}

export class SessionExpiredAction implements Action {
    readonly type = SessionActions.SessionExpired;
}

export class SetExistingSession implements Action {
    readonly type = SessionActions.SetExistingSession;
    constructor(public payload: Session) {}
}

// Action for effects only (no data in store)

export class SendPasswordRecoveryMail implements Action {
    readonly type = SessionActions.SendPasswordRecoveryMail;
    constructor(public payload: string) {}
}

export class ChangePassword implements Action {
    readonly type = SessionActions.ChangePassword;
    constructor(public payload: PasswordChangeObject) {}
}

export class ChangePasswordFromRecovery implements Action {
    readonly type = SessionActions.ChangePasswordFromRecovery;
    constructor(public payload: PasswordRecoveryObject) {}
}
