import { Notification } from '../models/Notification';
import { notificationReducer } from './notifications/notifications.reducer';
import { ISessionState, sessionReducer  } from './session/session.reducer';
import { IUserState, userReducer } from './user/user.reducer';
import { IUserListState, userlistReducer } from './userlist/userlist.reducer';
import { IEventState, eventReducer } from 'app/stores/event/event.reducer';
import { IEventListState, eventlistReducer } from 'app/stores/eventlist/eventlist.reducer';
import { ISubscriptionState, subscriptionsReducer } from 'app/stores/subscription/subscription.reducer';
import { appReducer, AppState } from './app/app.reducer';
import { addresslistReducer, IAddressListState } from './addresslist/addresslist.reducer';

export interface IGlobalState {
    appState: AppState;
    addressListState: IAddressListState;
    notificationState: Array<Notification>;
    sessionState: ISessionState;
    userlistState: IUserListState;
    userState: IUserState;
    eventState: IEventState;
    eventlistState: IEventListState;
    subscriptionsState: ISubscriptionState;
}

export const globalState = {
    appState: appReducer,
    addressListState: addresslistReducer,
    notificationState: notificationReducer,
    sessionState: sessionReducer,
    userlistState: userlistReducer,
    userState: userReducer,
    eventState: eventReducer,
    eventlistState: eventlistReducer,
    subscriptionsState: subscriptionsReducer
};
