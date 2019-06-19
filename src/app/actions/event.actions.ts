import { Action } from '@ngrx/store';

import { Event } from '@models/Event';

export enum EventActionTypes {
    getEventStart = '[Event] get start',
    getEventFinished = '[Event] get finished',
    getEventFailed = '[Event] get failed',
    addEvent = '[Event] add',
    updateEvent = '[Event] update',
    resetEventState = '[Event] reset state',
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

export class GetEventStart implements Action {
    readonly type = EventActionTypes.getEventStart;
    constructor(public payload: string) { }
}

export class GetEventFinished implements Action {
    readonly type = EventActionTypes.getEventFinished;
    constructor(public payload: Event) {}
}

export class GetEventFailed implements Action {
    readonly type = EventActionTypes.getEventFailed;
    constructor(public payload: Error) {}
}

export type EventActions = GetEventFinished
    | UpdateEvent
    | GetEventStart
    | ResetEventState;
