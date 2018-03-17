import { Action } from '@ngrx/store';

import { Subscription } from '../models/Subscription';
import { Event } from '../models/Event';
import { ActionWithPayload } from './app.actions';

export enum SubscriptionActions {
    getSubscriptionListAsyncStart = '[subscription] get Async Start',
    getSubscriptionListAsyncFinished = '[subscription] get Async Finished',
    getSubscriptionListAsyncFailed = '[subscription] get Async Failed',
    addSubscrToEvent = '[subscription] add to event',
    updateSubscrList = '[subscription] update list',
    deleteSubscrFromEvent = '[subscription] delete from event',
    resetSubscriptionState = '[subscription] reset state',
}


export function resetSubscriptionState(): Action {
    return {
        type: SubscriptionActions.resetSubscriptionState
    };
}

export function addSubscription(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: SubscriptionActions.addSubscrToEvent,
        payload
    };
}

export function updateSubscription(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: SubscriptionActions.updateSubscrList,
        payload
    };
}

export function deleteSubscription(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: SubscriptionActions.deleteSubscrFromEvent,
        payload
    };
}

export function getSubscriptionAsyncStart(payload: number): ActionWithPayload<number> {
    return {
        type: SubscriptionActions.getSubscriptionListAsyncStart,
        payload
    };
}

export function getSubscriptionAsyncFinished(payload: Array<Subscription>): ActionWithPayload<Array<Subscription>> {
    return {
        type: SubscriptionActions.getSubscriptionListAsyncFinished,
        payload
    };
}

export function getSubscriptionAsyncFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: SubscriptionActions.getSubscriptionListAsyncFailed,
        payload
    };
}
