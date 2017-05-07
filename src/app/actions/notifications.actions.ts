import { ActionReducer, Action } from '@ngrx/store';
import { Notification, ENotificationType } from '../models/Notification';

export const ADD_NOTIF = 'ADD_NOTIF';
export const DELETE_NOTIF = 'DELETE_NOTIF';
export const CLEAR_NOTIF = 'CLEAR_NOTIF';

export function addNotif(notif: Notification): Action {
    return { type: ADD_NOTIF, payload: notif };
}
export function deleteNotif(notif: Notification): Action {
    return { type: DELETE_NOTIF, payload: notif };
}