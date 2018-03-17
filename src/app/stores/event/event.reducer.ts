import { Action } from '@ngrx/store';

import { Event } from 'app/models/Event';
import { ActionWithPayload } from 'app/actions/app.actions';
import { EventActions } from 'app/actions/event.actions';

export interface IEventState {
    event: Event;
    isLoading: boolean;
}

export const initialState: IEventState = {
    event: undefined,
    isLoading: false
};

export function eventReducer(state: IEventState = initialState, action?: Action): IEventState {
    switch (action.type) {
        case EventActions.getEventAsyncStart:
            return Object.assign({}, state, { isLoading: true });

        case EventActions.getEventAsyncFinished:
        {
            const act = action as ActionWithPayload<Event>;
            return Object.assign({}, state, { event: act.payload, isLoading: false });
        }

        case EventActions.updateEvent:
        {
            const act = action as ActionWithPayload<Event>;
            return Object.assign({}, state, { event: act.payload });
        }

        case EventActions.resetEventState:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}
