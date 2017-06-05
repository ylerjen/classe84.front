import { Notification } from '../models/Notification';
import { notificationReducer } from './notifications/notifications.reducer';
import { sessionReducer  } from './session/session.reducer';
import { IUserListState, userlistReducer } from './userlist/userlistReducer';
import { IUserState, userReducer } from './user/userReducer';

export interface IAppState {
    notificationState;
    userlistState: IUserListState;
    userState: IUserState;
}

export const appState = {
    notificationState: notificationReducer,
    userlistState: userlistReducer,
    userState: userReducer,
    sessionState: sessionReducer,
};
