import { Action } from '@ngrx/store';

import { Event } from '@models/Event';

export enum EventActionTypes {
    getEvent = '[Event] Get',
    getEventSuccess = '[Event] Get success',
    getEventFailed = '[Event] Get failed',
    addEvent = '[Event] Add',
    updateEvent = '[Event] Update',
    resetEventState = '[Event] Reset state',
}

// ==== List of Actions Fn ====

export class ResetEventState implements Action {
    readonly type = EventActionTypes.resetEventState;
}

export class AddEvent implements Action {
    readonly type = EventActionTypes.addEvent;
    constructor(public payload: Event) {}
}

export class UpdateEvent implements Action {
    readonly type = EventActionTypes.updateEvent;
    constructor(public payload: Event) {}
}

export class GetEvent implements Action {
    readonly type = EventActionTypes.getEvent;
    constructor(public payload: string) { }
}

export class GetEventSuccess implements Action {
    readonly type = EventActionTypes.getEventSuccess;
    constructor(public payload: Event) {}
}

export class GetEventFailed implements Action {
    readonly type = EventActionTypes.getEventFailed;
    constructor(public payload: Error) {}
}

export type EventActions = GetEventSuccess
    | UpdateEvent
    | GetEvent
    | ResetEventState;
