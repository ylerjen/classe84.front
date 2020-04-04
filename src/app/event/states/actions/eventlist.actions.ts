import { Action } from '@ngrx/store';

import { Event as EventModel} from '@models/Event';
import { IEventListFilter } from '../../components/event-list-filter/event-list-filter.component';

export enum EventlistActionTypes {
    resetEventlistState = '[Eventlist] reset state',
    changeFilter = '[Eventlist] change filter',
    getEventlistAsyncStart = '[Eventlist] get Async Start',
    getEventlistAsyncFinished = '[Eventlist] get Async Finished',
    getEventlistAsyncFailed = '[Eventlist] get Async Failed',
    addEventInList = '[Eventlist] add In List',
    deleteEventFromList = '[Eventlist] delete From List',
}

export class ChangeEventListFilter implements Action {
    readonly type = EventlistActionTypes.changeFilter;
    constructor(public payload: IEventListFilter) { }
}

export class AddEventInlist implements Action {
    readonly type = EventlistActionTypes.addEventInList;
    constructor(public payload: EventModel) { }
}

export class DeleteEventFromList implements Action {
    readonly type = EventlistActionTypes.deleteEventFromList;
    constructor(public payload: EventModel) { }
}

export class EmptyEventList implements Action {
    readonly type = EventlistActionTypes.resetEventlistState;
}

export class GetEventListAsyncStart implements Action {
    readonly type = EventlistActionTypes.getEventlistAsyncStart;
}

export class GetEventListAsyncFinished implements Action {
    readonly type = EventlistActionTypes.getEventlistAsyncFinished;
    constructor(public payload: Array<EventModel>) { }
}

export class GetEventListAsyncFailed implements Action {
    readonly type = EventlistActionTypes.getEventlistAsyncFinished;
    constructor(public payload: Error) { }
}

export type EventlistActions = AddEventInlist
    | DeleteEventFromList
    | ChangeEventListFilter
    | EmptyEventList
    | GetEventListAsyncStart
    | GetEventListAsyncFinished
    | GetEventListAsyncFailed;
