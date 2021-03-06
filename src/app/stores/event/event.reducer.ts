import { Action } from '@ngrx/store';
import { tassign } from 'tassign';

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
        case EventActions.getEventStart:
            return tassign(state, { isLoading: true });

        case EventActions.getEventFinished:
        {
            const act = action as ActionWithPayload<Event>;
            return tassign(state, { event: act.payload, isLoading: false });
        }

        case EventActions.updateEvent:
        {
            const act = action as ActionWithPayload<Event>;
            return tassign(state, { event: act.payload });
        }

        case EventActions.resetEventState:
            return tassign(initialState);

        default:
            return state;
    }
}
