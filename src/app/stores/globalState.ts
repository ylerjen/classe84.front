import { Notification } from '../models/Notification';
import { notificationReducer } from './notifications/notifications.reducer';
import { SessionState, sessionReducer  } from './session/session.reducer';
import { IUserState, userReducer } from '../user/states/reducers/user/user.reducer';
import { UserListState, userlistReducer } from '../user/states/reducers/userlist/userlist.reducer';
import { EventState, eventReducer } from 'app/stores/event/event.reducer';
import { IEventListState, eventlistReducer } from 'app/stores/eventlist/eventlist.reducer';
import { ISubscriptionState, subscriptionsReducer } from 'app/stores/subscription/subscription.reducer';
import { appReducer, AppState } from './app/app.reducer';
import { addresslistReducer, IAddressListState } from './addresslist/addresslist.reducer';
import { participationsReducer } from './participation/participation.reducer';

export interface GlobalState {
    appState: AppState;
    addressListState: IAddressListState;
    notificationState: Array<Notification>;
    sessionState: SessionState;
    eventState: EventState;
    eventlistState: IEventListState;
    subscriptionsState: ISubscriptionState;
    participationsState: ISubscriptionState;
}

export const globalState = {
    appState: appReducer,
    addressListState: addresslistReducer,
    notificationState: notificationReducer,
    sessionState: sessionReducer,
    eventState: eventReducer,
    eventlistState: eventlistReducer,
    subscriptionsState: subscriptionsReducer,
    participationsState: participationsReducer
};
