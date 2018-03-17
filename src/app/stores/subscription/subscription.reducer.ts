import { Action } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import { SubscriptionActions } from 'app/actions/subscription.actions';
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
        case SubscriptionActions.getSubscriptionListAsyncStart:
            return Object.assign({}, state, { isLoading: true });

        case SubscriptionActions.getSubscriptionListAsyncFinished:
        {
            const act = action as ActionWithPayload<Array<Subscription>>;
            return Object.assign({}, state, {
                subscriptionList: act.payload,
                isLoading: false,
                dataDate: new Date()
            });
        }

        case SubscriptionActions.addSubscrToEvent:
        {
            const act = action as ActionWithPayload<Subscription>;
            return Object.assign({}, state, {
                subscriptionList: [
                    ...state.subscriptionList,
                    act.payload
                ]
            });
        }

        case SubscriptionActions.updateSubscrList:
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

        case SubscriptionActions.deleteSubscrFromEvent:
        {
            const act = action as ActionWithPayload<Subscription>;
            return Object.assign({}, state, {
                subscriptionList: state.subscriptionList.filter(
                    subscr => !(subscr.event_id === act.payload.event_id && subscr.user_id === act.payload.user_id)
                )
            });
        }

        case SubscriptionActions.resetSubscriptionState:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}
