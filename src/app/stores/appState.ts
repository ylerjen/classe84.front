import { IUserListState, IUserState } from './IState';
import { Notification } from '../models/Notification';
import { notificationReducer } from './notificationReducer';
import { userlistReducer,  } from './userlistReducer';
import { userReducer } from './userReducer';

export interface IAppState {
    notificationState;
    userlistState: IUserListState;
    userState: IUserState;
}


export const appState = {
    notificationState: notificationReducer,
    userlistState: userlistReducer,
    userState: userReducer
};
