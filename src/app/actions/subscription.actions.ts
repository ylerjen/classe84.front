import { Action } from '@ngrx/store';

import { Subscription } from '../models/Subscription';
import { ActionWithPayload } from './app.actions';

export const ASYNC_SUBSCRIPTION_LIST_START = 'ASYNC_SUBSCRIPTION_LIST_START';
export const ASYNC_SUBSCRIPTION_LIST_FINISHED = 'ASYNC_SUBSCRIPTION_LIST_FINISHED';
export const ADD_SUBSCRIPTION_TO_EVENT = 'ADD_SUBSCRIPTION_TO_EVENT';
export const UPDATE_SUBSCRIPTION_STATE = 'UPDATE_SUBSCRIPTION_STATE';
export const DELETE_SUBSCRIPTION_FROM_EVENT = 'DELETE_SUBSCRIPTION_FROM_EVENT';
export const RESET_SUBSCRIPTION_STATE = 'RESET_SUBSCRIPTION_STATE';


export function resetSubscriptionState(): Action {
    return {
        type: RESET_SUBSCRIPTION_STATE
    };
}

export function addSubscription(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: ADD_SUBSCRIPTION_TO_EVENT,
        payload
    };
}

export function updateSubscription(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: UPDATE_SUBSCRIPTION_STATE,
        payload
    };
}

export function deleteSubscription(payload: Subscription): ActionWithPayload<Subscription> {
    return {
        type: DELETE_SUBSCRIPTION_FROM_EVENT,
        payload
    };
}

export function getSubscriptionAsyncStart(): Action {
    return {
        type: ASYNC_SUBSCRIPTION_LIST_START
    };
}

export function getSubscriptionAsyncFinished(payload: Array<Subscription>): ActionWithPayload<Array<Subscription>> {
    return {
        type: ASYNC_SUBSCRIPTION_LIST_FINISHED,
        payload
    };
}
