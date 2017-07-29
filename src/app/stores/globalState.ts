import { Notification } from '../models/Notification';
import { notificationReducer } from './notifications/notifications.reducer';
import { ISessionState, sessionReducer  } from './session/session.reducer';
import { IUserListState, userlistReducer } from './userlist/userlistReducer';
import { IUserState, userReducer } from './user/userReducer';
import { appReducer } from './app/appReducer';

export interface IGlobalState {
    appState: string;
    notificationState: Array<Notification>;
    sessionState: ISessionState;
    userlistState: IUserListState;
    userState: IUserState;
}

export const globalState = {
    appState: appReducer,
    notificationState: notificationReducer,
    sessionState: sessionReducer,
    userlistState: userlistReducer,
    userState: userReducer,
};
