import { Action } from '@ngrx/store';

import { Subscription } from '../models/Subscription';
import { ActionWithPayload } from './app.actions';

/**
 * This is the type of subscription we want to retrieve
 * as the store is the same for the EventSubscriptions and
 * the UserSubscriptions
 */
export enum SubscriptionType {
    /**
     * Subscriptions of a user
     */
    User,
    /**
     * Subscriptions to an event
     */
    Event,
}

export enum SubscriptionActions {
    getSubscriptionListStart = '[subscription] get Start',
    getSubscriptionListFinished = '[subscription] get Finished',
    getSubscriptionListFailed = '[subscription] get Failed',
    addSubscrToEvent = '[subscription] add to event',
    updateSubscrList = '[subscription] update list',
    deleteSubscrFromEvent = '[subscription] delete from event',
    resetSubscriptionState = '[subscription] reset state',
}

/**
 * The contract to pass to the action when we
 * want to retrieve the subscriptions
 */
export interface SubscriptionRqstCmd {
    id: string;
    type: SubscriptionType;
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

export function getSubscriptionStart(payload: SubscriptionRqstCmd): ActionWithPayload<SubscriptionRqstCmd> {
    return {
        type: SubscriptionActions.getSubscriptionListStart,
        payload
    };
}

export function getSubscriptionFinished(payload: Array<Subscription>): ActionWithPayload<Array<Subscription>> {
    return {
        type: SubscriptionActions.getSubscriptionListFinished,
        payload
    };
}

export function getSubscriptionFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: SubscriptionActions.getSubscriptionListFailed,
        payload
    };
}
