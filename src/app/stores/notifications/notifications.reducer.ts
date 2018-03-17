import { Action } from '@ngrx/store';

import { Notification } from 'app/models/Notification';
import { ADD_NOTIF, DELETE_NOTIF, CLEAR_NOTIF } from 'app/actions/notifications.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export const initialState: Array<Notification> = [];

export function notificationReducer(state: Array<Notification> = initialState, action: Action): Array<Notification> {
    switch (action.type) {
        case ADD_NOTIF:
        {
            const act = action as ActionWithPayload<Notification>;
            return [
                ...state,
                act.payload
            ];
        }

        case DELETE_NOTIF:
        {
            const act = action as ActionWithPayload<Notification>;
            return state.filter(n => n.id !== act.payload.id);
        }

        case CLEAR_NOTIF:
            return [];

        default:
            return state;
    }
}
