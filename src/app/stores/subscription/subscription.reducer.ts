import { Action } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import {
    ASYNC_SUBSCRIPTION_LIST_START,
    ASYNC_SUBSCRIPTION_LIST_FINISHED,
    ADD_SUBSCRIPTION_TO_EVENT,
    DELETE_SUBSCRIPTION_FROM_EVENT,
    RESET_SUBSCRIPTION_STATE,
    UPDATE_SUBSCRIPTION_STATE
} from 'app/actions/subscription.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface ISubscriptionState {
    subscriptionList: Array<Subscription>;
    isLoading: boolean;
    dataDate: Date;
}

export const initialState: ISubscriptionState = {
    subscriptionList: [],
    isLoading: false,
    dataDate: undefined
};

export function subscriptionsReducer(state: ISubscriptionState = initialState, action?: Action): ISubscriptionState {
    switch (action.type) {
        case ASYNC_SUBSCRIPTION_LIST_START:
            return Object.assign({}, state, { isLoading: true });

        case ASYNC_SUBSCRIPTION_LIST_FINISHED:
        {
            const act = action as ActionWithPayload<Array<Subscription>>;
            return Object.assign({}, state, {
                subscriptionList: act.payload,
                isLoading: false,
                dataDate: new Date()
            });
        }

        case ADD_SUBSCRIPTION_TO_EVENT:
        {
            const act = action as ActionWithPayload<Subscription>;
            return Object.assign({}, state, {
                subscriptionList: [
                    ...state.subscriptionList,
                    act.payload
                ]
            });
        }

        case UPDATE_SUBSCRIPTION_STATE:
        {
            const act = action as ActionWithPayload<Subscription>;
            return Object.assign({}, state, {
                subscriptionList: [
                    ...state.subscriptionList.map(
                        (subscr) => (subscr.user_id === act.payload.user_id && subscr.event_id === act.payload.event_id)
                        ? act.payload
                        : subscr)
                    ]
                });
            }

        case DELETE_SUBSCRIPTION_FROM_EVENT:
        {
            const act = action as ActionWithPayload<Subscription>;
            return Object.assign({}, state, {
                subscriptionList: state.subscriptionList.filter(
                    subscr => !(subscr.event_id === act.payload.event_id && subscr.user_id === act.payload.user_id)
                )
            });
        }

        case RESET_SUBSCRIPTION_STATE:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}
