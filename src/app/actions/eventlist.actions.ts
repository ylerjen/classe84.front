import { Action } from '@ngrx/store';

import { Event as EventModel} from '../models/Event';
import { ActionWithPayload } from './app.actions';
import { IEventListFilter } from '../event/components/event-list-filter/event-list-filter.component';

export enum EventlistActions {
    resetEventlistState = '[Eventlist] reset state',
    changeFilter = '[Eventlist] change filter',
    getEventlistAsyncStart = '[Eventlist] get Async Start',
    getEventlistAsyncFinished = '[Eventlist] get Async Finished',
    getEventlistAsyncFailed = '[Eventlist] get Async Failed',
    addEventInList = '[Eventlist] add In List',
    deleteEventFromList = '[Eventlist] delete From List',
}


export function changeEventListFilter(payload: IEventListFilter): ActionWithPayload<IEventListFilter> {
    return {
        type: EventlistActions.changeFilter,
        payload
    };
}

export function addEventInlist(payload: EventModel): ActionWithPayload<EventModel> {
    return {
        type: EventlistActions.addEventInList,
        payload
    };
}

export function deleteEventFromList(payload: EventModel): ActionWithPayload<EventModel> {
    return {
        type: EventlistActions.deleteEventFromList,
        payload
    };
}

export function emptyEventList(): Action {
    return {
        type: EventlistActions.resetEventlistState
    };
}

export function getEventListAsyncStart(): Action {
    return {
        type: EventlistActions.getEventlistAsyncStart
    };
}

export function getEventListAsyncFinished(payload: Array<EventModel>): ActionWithPayload<Array<EventModel>> {
    return {
        type: EventlistActions.getEventlistAsyncFinished,
        payload
    };
}

export function getEventListAsyncFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: EventlistActions.getEventlistAsyncFinished,
        payload
    };
}
