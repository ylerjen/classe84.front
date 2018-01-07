import { ActionReducer, Action } from '@ngrx/store';

import { Event } from '../../models/Event';
import { ASYNC_EVENTLIST_START, ASYNC_EVENTLIST_SUCCESS, ADD_EVENT, DELETE_EVENT, EMPTY } from '../../actions/events.actions';

export interface IEventListState {
    eventList: Event[];
    isLoading: boolean;
    eventFilter: string;
}

export const initialState: IEventListState = {
    eventList: [],
    isLoading: false,
    eventFilter: ''
};

export function eventlistReducer(state: IEventListState = initialState, action: Action): IEventListState {
    switch (action.type) {
        case ASYNC_EVENTLIST_START:
            return Object.assign({}, state, {
                isLoading: true
            });

        case ASYNC_EVENTLIST_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: action.payload.slice()
            });

        case ADD_EVENT:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: [
                    ...state.eventList,
                    action.payload
                ]
            });

        case DELETE_EVENT:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: state.eventList.filter(event => event.id !== action.payload.id)
            });

        case EMPTY:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: []
            });

        default:
            return state;
    }
}
