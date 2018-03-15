import { Action } from '@ngrx/store';

import { Event } from 'app/models/Event';
import { ActionWithPayload } from 'app/actions/app.actions';
import {
    ASYNC_EVENT_START,
    ASYNC_EVENT_SUCCESS,
    UPDATE_EVENT,
    RESET_EVENT_STATE
} from 'app/actions/event.actions';

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
        case ASYNC_EVENT_START:
            return Object.assign({}, state, { isLoading: true });

        case ASYNC_EVENT_SUCCESS:
        {
            const act = action as ActionWithPayload<Event>;
            return Object.assign({}, state, { event: act.payload, isLoading: false });
        }

        case UPDATE_EVENT:
        {
            const act = action as ActionWithPayload<Event>;
            return Object.assign({}, state, { event: act.payload });
        }

        case RESET_EVENT_STATE:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}
