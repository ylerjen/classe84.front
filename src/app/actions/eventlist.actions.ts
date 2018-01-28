import { Action } from '@ngrx/store';

import { Event as EventModel} from '../models/Event';

export const EMPTY_EVENTLIST = 'EMPTY_EVENTLIST';
export const CHANGE_FILTER = 'EVENTLIST_CHANGE_FILTER';
export const ASYNC_EVENTLIST_START = 'EVENTLIST_ASYNC_START';
export const ASYNC_EVENTLIST_FINISHED = 'ASYNC_EVENTLIST_FINISHED';
export const ADD_EVENT_IN_EVENTLIST = 'ADD_EVENT_IN_EVENTLIST';
export const DELETE_EVENT_FROM_EVENTLIST = 'DELETE_EVENT_FROM_EVENTLIST';


export function changeEventListFilter(payload: string): Action {
    return {
        type: CHANGE_FILTER,
        payload
    };
}

export function addEventInlist(payload: EventModel): Action {
    return {
        type: ADD_EVENT_IN_EVENTLIST,
        payload
    };
}

export function deleteEventFromList(payload: EventModel): Action {
    return {
        type: DELETE_EVENT_FROM_EVENTLIST,
        payload
    };
}

export function emptyEventList(): Action {
    return {
        type: EMPTY_EVENTLIST
    };
}

export function getEventListAsyncStart(): Action {
    return {
        type: ASYNC_EVENTLIST_START
    };
}

export function getEventListAsyncFinished(payload: Array<EventModel>): Action {
    return {
        type: ASYNC_EVENTLIST_FINISHED,
        payload
    };
}
