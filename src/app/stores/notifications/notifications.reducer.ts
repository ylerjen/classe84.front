import { Notification } from 'app/models/Notification';
import { NotificationActions, NotifActions, AddNotif, DeleteNotif } from 'app/actions/notifications.actions';

export const initialState: Array<Notification> = [];

export function notificationReducer(state: Array<Notification> = initialState, action: NotifActions): Array<Notification> {
    switch (action.type) {
        case NotificationActions.AddNotification:
        {
            const act = action as AddNotif;
            return [
                ...state,
                act.payload
            ];
        }

        case NotificationActions.DeleteNotification:
        {
            const act = action as DeleteNotif;
            return state.filter(n => n.id !== act.payload.id);
        }

        case NotificationActions.ClearNotification:
            return [];

        default:
            return state;
    }
}
