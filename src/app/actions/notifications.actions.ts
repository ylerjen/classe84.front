import { Action } from '@ngrx/store';
import { Notification } from '../models/Notification';

export enum NotificationActions {
    AddNotification = '[Notification] Add',
    DeleteNotification = '[Notification] Delete',
    ClearNotification = '[Notification] Clear',
}

export class AddNotif implements Action {
    readonly type = NotificationActions.AddNotification;
    constructor(public payload: Notification) { }
}
export class DeleteNotif implements Action {
    readonly type = NotificationActions.DeleteNotification;
    constructor(public payload: Notification) { }
}
export class ClearNotif implements Action {
    readonly type = NotificationActions.ClearNotification;
}

export type NotifActions = AddNotif
    | DeleteNotif
    | ClearNotif;
