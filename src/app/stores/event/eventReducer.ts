import { ActionReducer, Action } from '@ngrx/store';

import { Event } from '../../models/Event';
import { GET_EVENT, ASYNC_EVENT_START, ASYNC_EVENT_SUCCESS, UPDATE_EVENT, DELETE_EVENT } from '../../actions/events.actions';

export interface IEventState {
    event: Event;
    isLoading: boolean;
}

const initialState: IEventState = {
    event: undefined,
    isLoading: false
};

export function eventReducer(state: IEventState = initialState, action: Action): IEventState {
    switch (action.type) {
        case GET_EVENT:
            return Object.assign({}, state, { event: action.payload });

        case ASYNC_EVENT_START:
            return Object.assign({}, state, { isLoading: true });

        case ASYNC_EVENT_SUCCESS:
            return Object.assign({}, state, { event: action.payload, isLoading: false });

        case UPDATE_EVENT:
            return Object.assign({}, state, { event: action.payload });

        case DELETE_EVENT:
            return Object.assign({}, state, { event: undefined });

        default:
            return state;
    }
}
