import { Action } from '@ngrx/store';

import { Subscription } from '../models/Subscription';
import { ActionWithPayload } from './app.actions';
import { ErrorWithContext } from '@models/ErrorWithContext';

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
    getSubscriptionListStart    = '[Subscription] get Start',
    getSubscriptionListFinished = '[Subscription] get Finished',
    getSubscriptionListFailed   = '[Subscription] get Failed',
    addSubscription             = '[Subscription] add',
    addSubscriptionFinished     = '[Subscription] add Finished',
    addSubscriptionFailed       = '[Subscription] add Failed',
    deleteSubscription          = '[Subscription] delete',
    deleteSubscriptionFinished  = '[Subscription] delete Finished',
    deleteSubscriptionFailed    = '[Subscription] delete Failed',
    updateSubscrList            = '[Subscription] update list',
    resetSubscriptionState      = '[Subscription] reset state',
}

/**
 * The contract to pass to the action when we
 * want to retrieve the subscriptions
 */
export interface FetchSubscriptionCmd {
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
        type: SubscriptionActions.addSubscription,
        payload
    };
}

export function addSubscriptionFinished(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: SubscriptionActions.addSubscriptionFinished,
        payload
    };
}

export function addSubscriptionFailed(payload: ErrorWithContext<Subscription>): ActionWithPayload<ErrorWithContext<Subscription>> {
    return {
        type: SubscriptionActions.addSubscriptionFailed,
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
        type: SubscriptionActions.deleteSubscription,
        payload
    };
}

export function deleteSubscriptionFinished(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: SubscriptionActions.deleteSubscriptionFinished,
        payload
    };
}

export function deleteSubscriptionFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: SubscriptionActions.deleteSubscriptionFailed,
        payload
    };
}

export function getSubscriptionStart(payload: FetchSubscriptionCmd): ActionWithPayload<FetchSubscriptionCmd> {
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
