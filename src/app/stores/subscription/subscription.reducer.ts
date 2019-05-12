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
        case SubscriptionActions.getSubscriptionListStart:
        return {
            ...state,
            isLoading: true
        };

        case SubscriptionActions.getSubscriptionListFinished:
        {
            const act = action as ActionWithPayload<Array<Subscription>>;
            return {
                ...state,
                subscriptionList: act.payload,
                isLoading: false,
                dataDate: new Date()
            };
        }

        case SubscriptionActions.addSubscription:
        {
            const act = action as ActionWithPayload<Subscription>;
            act.payload.isStorePending = true;
            return {
                ...state,
                subscriptionList: [
                    ...state.subscriptionList,
                    act.payload
                ]
            };
        }

        case SubscriptionActions.addSubscriptionFinished:
        {
            const act = action as ActionWithPayload<Subscription>;
            return {
                ...state,
                subscriptionList: state.subscriptionList.map( subsc => {
                    if (subsc.user_id === act.payload.user_id
                        && subsc.event_id === act.payload.event_id) {
                            const newSub = new Subscription(subsc);
                            newSub.isStorePending = false;
                            return newSub;
                    }
                    return subsc;
                })
            };
        }

        case SubscriptionActions.updateSubscrList:
        {
            const act = action as ActionWithPayload<Subscription>;
            return {
                ...state,
                subscriptionList: [
                    ...state.subscriptionList.map(
                        (subscr) => (subscr.user_id === act.payload.user_id && subscr.event_id === act.payload.event_id)
                        ? act.payload
                        : subscr)
                    ]
            };
                }

        case SubscriptionActions.deleteSubscription:
        {
            const act = action as ActionWithPayload<Subscription>;
            return {
                ...state,
                subscriptionList: state.subscriptionList.map( subsc => {
                    if (subsc.user_id === act.payload.user_id
                        && subsc.event_id === act.payload.event_id) {
                            const newSub = new Subscription(subsc);
                            newSub.isStorePending = true;
                            return newSub;
                    }
                    return subsc;
                })
            };
        }

        case SubscriptionActions.deleteSubscriptionFinished:
        {
            const act = action as ActionWithPayload<Subscription>;
            return {
                ...state,
                subscriptionList: state.subscriptionList.filter(
                    subscr => !(subscr.event_id === act.payload.event_id && subscr.user_id === act.payload.user_id)
                )
            };
        }

        case SubscriptionActions.resetSubscriptionState:
        {
            return { ...initialState };
        }

        default:
            return state;
    }
}
