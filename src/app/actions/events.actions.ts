import { Action } from '@ngrx/store';

import { Event } from '../models/Event';

export const ASYNC_EVENTLIST_START = 'EVENTLIST_ASYNC_START';
export const ASYNC_EVENTLIST_SUCCESS = 'EVENTLIST_ASYNC_SUCCESS';
export const ASYNC_EVENT_START = 'EVENT_ASYNC_START';
export const ASYNC_EVENT_SUCCESS = 'EVENT_ASYNC_SUCCESS';
export const GET_EVENT = 'EVENT_GET';
export const ADD_EVENT = 'EVENT_ADD';
export const UPDATE_EVENT = 'EVENT_UPDATE';
export const DELETE_EVENT = 'EVENT_DELETE';
export const RESET = 'EVENTLIST_RESET';
export const EMPTY = 'EVENTLIST_EMPTY';
export const CHANGE_FILTER = 'EVENTLIST_CHANGE_FILTER';


export function addEvent(payload: Event): Action {
    return {
        type: ADD_EVENT,
        payload
    };
}

export function updateEvent(payload: Event): Action {
    return {
        type: UPDATE_EVENT,
        payload
    };
}

export function deleteEvent(payload: Event): Action {
    return {
        type: DELETE_EVENT,
        payload
    };
}

export function changeFilter(payload: string): Action {
    return {
        type: CHANGE_FILTER,
        payload
    };
}
