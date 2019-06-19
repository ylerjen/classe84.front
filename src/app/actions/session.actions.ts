import { Action } from '@ngrx/store';

import { Session } from '../models/Session';
import { Login, PasswordChangeObject, PasswordRecoveryObject } from '../models/Login';
import { User } from '@models/User';

export enum SessionActionTypes {
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
    readonly type = SessionActionTypes.AddFormErrors;
    public payload: Array<string> = [];
    constructor(...payload) {
        this.payload = payload;
    }
}

export class EmptyFormErrorsAction implements Action {
    readonly type = SessionActionTypes.EmptyFormErrors;
}

export class LoginAction implements Action {
    readonly type = SessionActionTypes.Login;
    constructor(public payload: Login) { }
}

export class LoginFinishedAction implements Action {
    readonly type = SessionActionTypes.LoginFinished;
    constructor(public payload: Session) { }
}

export class LoginFailedAction implements Action {
    readonly type = SessionActionTypes.LoginFailed;
    constructor(public payload: Error) { }
}

export class FetchLoggedUserAction implements Action {
    readonly type = SessionActionTypes.FetchUser;
}

export class FetchLoggedUserFinishedAction implements Action {
    readonly type = SessionActionTypes.FetchUserFinished;
    constructor(public payload: User) { }
}

export class FetchLoggedUserFailedAction implements Action {
    readonly type = SessionActionTypes.FetchUserFailed;
    constructor(public payload: Error) { }
}

export class LogoutAction implements Action {
    readonly type = SessionActionTypes.Logout;
}

export class LogoutFinishedAction implements Action {
    readonly type = SessionActionTypes.LogoutFinished;
}

export class LogoutFailedAction implements Action {
    readonly type = SessionActionTypes.LogoutFailed;
    constructor(public payload: Error) { }
}

export class SessionExpiredAction implements Action {
    readonly type = SessionActionTypes.SessionExpired;
}

export class SetExistingSession implements Action {
    readonly type = SessionActionTypes.SetExistingSession;
    constructor(public payload: Session) {}
}

// Action for effects only (no data in store)

export class SendPasswordRecoveryMail implements Action {
    readonly type = SessionActionTypes.SendPasswordRecoveryMail;
    constructor(public payload: string) {}
}

export class ChangePassword implements Action {
    readonly type = SessionActionTypes.ChangePassword;
    constructor(public payload: PasswordChangeObject) {}
}

export class ChangePasswordFromRecovery implements Action {
    readonly type = SessionActionTypes.ChangePasswordFromRecovery;
    constructor(public payload: PasswordRecoveryObject) {}
}

export type SessionActions = LoginAction
    | LoginFinishedAction
    | LoginFailedAction
    | LogoutAction
    | AddFormErrorsAction
    | EmptyFormErrorsAction
    | SetExistingSession
    | SessionExpiredAction;
