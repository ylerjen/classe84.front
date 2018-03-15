import { Action } from '@ngrx/store';

import { Event } from '../models/Event';
import { ActionWithPayload } from './app.actions';

export const ASYNC_EVENT_START = 'EVENT_ASYNC_START';
export const ASYNC_EVENT_SUCCESS = 'EVENT_ASYNC_SUCCESS';
export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'EVENT_UPDATE';
export const RESET_EVENT_STATE = 'RESET_EVENT_STATE';


export function resetEventState(): Action {
    return {
        type: RESET_EVENT_STATE
    }
}

export function addEvent(payload: Event): ActionWithPayload<Event> {
    return {
        type: ADD_EVENT,
        payload
    };
}

export function updateEvent(payload: Event): ActionWithPayload<Event> {
    return {
        type: UPDATE_EVENT,
        payload
    };
}

export function getEventAsyncStart(): Action {
    return {
        type: ASYNC_EVENT_START
    };
}

export function getEventAsyncFinished(payload: Event): ActionWithPayload<Event> {
    return {
        type: ASYNC_EVENT_SUCCESS,
        payload
    };
}
