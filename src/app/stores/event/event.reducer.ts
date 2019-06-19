import { Event } from 'app/models/Event';
import { EventActionTypes, GetEventFinished, UpdateEvent, EventActions } from 'app/actions/event.actions';

export interface IEventState {
    event: Event;
    isLoading: boolean;
}

export const initialState: IEventState = {
    event: undefined,
    isLoading: false
};

export function eventReducer(state: IEventState = initialState, action?: EventActions): IEventState {
    switch (action.type) {
        case EventActionTypes.getEventStart:
            return {
                ...state,
                isLoading: true
            };

        case EventActionTypes.getEventFinished:
        {
            const act = action as GetEventFinished;
            return {
                ...state,
                event: act.payload,
                isLoading: false
            };
        }

        case EventActionTypes.updateEvent:
        {
            const act = action as UpdateEvent;
            return {
                ...state,
                event: act.payload
            };
        }

        case EventActionTypes.resetEventState:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
