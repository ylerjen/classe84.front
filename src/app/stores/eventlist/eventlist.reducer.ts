import { Action } from '@ngrx/store';

import {
    ASYNC_EVENTLIST_START,
    ASYNC_EVENTLIST_FINISHED,
    ADD_EVENT_IN_EVENTLIST,
    DELETE_EVENT_FROM_EVENTLIST,
    EMPTY_EVENTLIST } from '../../actions/eventlist.actions';
import { Event } from '../../models/Event';

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

        case ASYNC_EVENTLIST_FINISHED:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: action.payload.slice()
            });

        case ADD_EVENT_IN_EVENTLIST:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: [
                    ...state.eventList,
                    action.payload
                ]
            });

        case DELETE_EVENT_FROM_EVENTLIST:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: state.eventList.filter(event => event.id !== action.payload.id)
            });

        case EMPTY_EVENTLIST:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: []
            });

        default:
            return state;
    }
}
