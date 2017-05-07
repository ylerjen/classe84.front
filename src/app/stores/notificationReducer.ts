import { ActionReducer, Action } from '@ngrx/store';

import { Notification, ENotificationType } from '../models/Notification';
import { ADD_NOTIF, DELETE_NOTIF, CLEAR_NOTIF } from '../actions/notifications.actions';

let u = new Notification('lorem20', ENotificationType.INFO);

export const initialState: Array<Notification> = [];

export function notificationReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ADD_NOTIF:
            return [
                ...state,
                action.payload
            ];

        case DELETE_NOTIF:
            return state.filter(n => n.id !== action.payload.id);

        case CLEAR_NOTIF:
            return [];

        default:
            return state;
    }
}
