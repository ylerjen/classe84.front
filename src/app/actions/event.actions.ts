import { Action } from '@ngrx/store';

import { Event } from '../models/Event';
import { ActionWithPayload } from './app.actions';

export enum EventActions {
    getEventAsyncStart = '[Event] EVENT_ASYNC_START',
    getEventAsyncFinished = '[Event] EVENT_ASYNC_SUCCESS',
    addEvent = '[Event] ADD_EVENT',
    updateEvent = '[Event] EVENT_UPDATE',
    resetEventState = '[Event] RESET_EVENT_STATE',
}


export function resetEventState(): Action {
    return {
        type: EventActions.resetEventState
    }
}

export function addEvent(payload: Event): ActionWithPayload<Event> {
    return {
        type: EventActions.addEvent,
        payload
    };
}

export function updateEvent(payload: Event): ActionWithPayload<Event> {
    return {
        type: EventActions.updateEvent,
        payload
    };
}

export function getEventAsyncStart(): Action {
    return {
        type: EventActions.getEventAsyncStart
    };
}

export function getEventAsyncFinished(payload: Event): ActionWithPayload<Event> {
    return {
        type: EventActions.getEventAsyncFinished,
        payload
    };
}

export function getEventAsyncFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: EventActions.getEventAsyncFinished,
        payload
    };
}
