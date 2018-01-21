import { Action } from '@ngrx/store';

import { Event } from '../models/Event';
import { Subscription } from '../models/Subscription';

export const ASYNC_EVENT_START = 'EVENT_ASYNC_START';
export const ASYNC_EVENT_SUCCESS = 'EVENT_ASYNC_SUCCESS';
export const ADD_EVENT = 'ADD_EVENT';
export const UPDATE_EVENT = 'EVENT_UPDATE';
export const RESET_EVENT_STATE = 'RESET_EVENT_STATE';
export const SET_EVENT_SUBSCRIBERS = 'SET_EVENT_SUBSCRIBERS';


export function resetEventState(): Action {
    return {
        type: RESET_EVENT_STATE
    }
}

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

export function getEventAsyncStart(): Action {
    return {
        type: ASYNC_EVENT_START
    };
}

export function getEventAsyncFinished(payload: Event): Action {
    return {
        type: ASYNC_EVENT_SUCCESS,
        payload
    };
}

export function setSubscribersToEvent(payload: Array<Subscription>): Action {
    return {
        type: SET_EVENT_SUBSCRIBERS,
        payload
    }
}
