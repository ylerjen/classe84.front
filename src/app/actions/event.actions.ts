import { Action } from '@ngrx/store';

import { Event } from '../models/Event';
import { ActionWithPayload } from './app.actions';

export enum EventActions {
    getEventStart = '[Event] get start',
    getEventFinished = '[Event] get finished',
    getEventFailed = '[Event] get failed',
    addEvent = '[Event] add',
    updateEvent = '[Event] update',
    resetEventState = '[Event] reset state',
}


// ==== List of Actions Fn ====

export function resetEventState(): Action {
    return {
        type: EventActions.resetEventState
    };
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

export function getEventStart(payload: string): ActionWithPayload<string> {
    return {
        type: EventActions.getEventStart,
        payload
    };
}

export function getEventFinished(payload: Event): ActionWithPayload<Event> {
    return {
        type: EventActions.getEventFinished,
        payload
    };
}

export function getEventFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: EventActions.getEventFailed,
        payload
    };
}
