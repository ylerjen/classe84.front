import { Event } from 'app/models/Event';
import { EventActions, GetEventFinished, UpdateEvent, EventActionsClass } from 'app/actions/event.actions';

export interface IEventState {
    event: Event;
    isLoading: boolean;
}

export const initialState: IEventState = {
    event: undefined,
    isLoading: false
};

export function eventReducer(state: IEventState = initialState, action?: EventActionsClass): IEventState {
    switch (action.type) {
        case EventActions.getEventStart:
            return {
                ...state,
                isLoading: true
            };

        case EventActions.getEventFinished:
        {
            const act = action as GetEventFinished;
            return {
                ...state,
                event: act.payload,
                isLoading: false
            };
        }

        case EventActions.updateEvent:
        {
            const act = action as UpdateEvent;
            return {
                ...state,
                event: act.payload
            };
        }

        case EventActions.resetEventState:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
