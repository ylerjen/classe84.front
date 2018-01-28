import { Action } from '@ngrx/store';
import { Notification } from '../models/Notification';

export const ADD_NOTIF = 'ADD_NOTIF';
export const DELETE_NOTIF = 'DELETE_NOTIF';
export const CLEAR_NOTIF = 'CLEAR_NOTIF';

export function addNotif(payload: Notification): Action {
    return { type: ADD_NOTIF, payload };
}
export function deleteNotif(payload: Notification): Action {
    return { type: DELETE_NOTIF, payload };
}
export function clearNotif(): Action {
    return { type: CLEAR_NOTIF };
}
