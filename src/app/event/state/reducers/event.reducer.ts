import { Event } from 'app/models/Event';
import { EventActionTypes, GetEventSuccess, UpdateEvent, EventActions } from 'app/event/state/actions/event.actions';

export interface EventState {
    event: Event;
    isLoading: boolean;
    loadTime: Date;
}

export const initialState: EventState = {
    event: undefined,
    isLoading: false,
    loadTime: null,
};

export function eventReducer(state: EventState = initialState, action?: EventActions): EventState {
    switch (action.type) {
        case EventActionTypes.getEvent:
            return {
                ...state,
                isLoading: true,
            };

        case EventActionTypes.getEventSuccess: {
            const act = action as GetEventSuccess;
            return {
                ...state,
                event: act.payload,
                isLoading: false,
                loadTime: new Date(),
            };
        }

        case EventActionTypes.updateEvent: {
            const act = action as UpdateEvent;
            return {
                ...state,
                event: act.payload,
            };
        }

        case EventActionTypes.resetEventState:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}
