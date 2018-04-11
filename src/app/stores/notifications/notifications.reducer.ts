import { Action } from '@ngrx/store';

import { Notification } from 'app/models/Notification';
import { NotificationActions } from 'app/actions/notifications.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export const initialState: Array<Notification> = [];

export function notificationReducer(state: Array<Notification> = initialState, action: Action): Array<Notification> {
    switch (action.type) {
        case NotificationActions.AddNotification:
        {
            const act = action as ActionWithPayload<Notification>;
            return [
                ...state,
                act.payload
            ];
        }

        case NotificationActions.DeleteNotification:
        {
            const act = action as ActionWithPayload<Notification>;
            return state.filter(n => n.id !== act.payload.id);
        }

        case NotificationActions.ClearNotification:
            return [];

        default:
            return state;
    }
}
