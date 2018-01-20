import { Notification } from '../models/Notification';
import { notificationReducer } from './notifications/notifications.reducer';
import { ISessionState, sessionReducer  } from './session/session.reducer';
import { IUserState, userReducer } from './user/userReducer';
import { IUserListState, userlistReducer } from './userlist/userlistReducer';
import { IEventState, eventReducer } from 'app/stores/event/event.reducer';
import { IEventListState, eventlistReducer } from 'app/stores/eventlist/eventlistReducer';
import { appReducer } from './app/appReducer';

export interface IGlobalState {
    appState: string;
    notificationState: Array<Notification>;
    sessionState: ISessionState;
    userlistState: IUserListState;
    userState: IUserState;
    eventState: IEventState,
    eventlistState: IEventListState;
}

export const globalState = {
    appState: appReducer,
    notificationState: notificationReducer,
    sessionState: sessionReducer,
    userlistState: userlistReducer,
    userState: userReducer,
    eventState: eventReducer,
    eventlistState: eventlistReducer,
};
