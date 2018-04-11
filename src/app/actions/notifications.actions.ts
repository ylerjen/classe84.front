import { Action } from '@ngrx/store';
import { Notification } from '../models/Notification';
import { ActionWithPayload } from './app.actions';

export enum NotificationActions {
    AddNotification = '[Notification] Add',
    DeleteNotification = '[Notification] Delete',
    ClearNotification = '[Notification] Clear',
}

export function addNotif(payload: Notification): ActionWithPayload<Notification> {
    return { type: NotificationActions.AddNotification, payload };
}
export function deleteNotif(payload: Notification): ActionWithPayload<Notification> {
    return { type: NotificationActions.DeleteNotification, payload };
}
export function clearNotif(): Action {
    return { type: NotificationActions.DeleteNotification };
}
