import { Notification } from '../models/Notification';
import { notificationReducer } from './notifications/notifications.reducer';
import { IUserState, userReducer } from './user/user.reducer';
import { UserListState, userlistReducer } from './userlist/userlist.reducer';
import { EventState, eventReducer } from 'app/event/state/reducers/event.reducer';
import { IEventListState, eventlistReducer } from 'app/event/state/reducers/eventlist.reducer';
import { ISubscriptionState, subscriptionsReducer } from 'app/stores/subscription/subscription.reducer';
import { appReducer, AppState } from './app/app.reducer';
import { addresslistReducer, IAddressListState } from './addresslist/addresslist.reducer';
import { participationsReducer } from './participation/participation.reducer';

export interface GlobalState {
    appState: AppState;
    addressListState: IAddressListState;
    notificationState: Array<Notification>;
    userlistState: UserListState;
    userState: IUserState;
    eventState: EventState;
    eventlistState: IEventListState;
    subscriptionsState: ISubscriptionState;
    participationsState: ISubscriptionState;
}

export const globalState = {
    appState: appReducer,
    addressListState: addresslistReducer,
    notificationState: notificationReducer,
    userlistState: userlistReducer,
    userState: userReducer,
    eventState: eventReducer,
    eventlistState: eventlistReducer,
    subscriptionsState: subscriptionsReducer,
    participationsState: participationsReducer
};
