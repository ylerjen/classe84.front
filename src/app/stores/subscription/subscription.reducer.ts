import { Subscription } from '@models/Subscription';
import { SubscriptionActionTypes,
    GetSubscriptionStart,
    GetSubscriptionFinished,
    AddSubscription,
    AddSubscriptionFinished,
    AddSubscriptionFailed,
    UpdateSubscription,
    DeleteSubscription,
    DeleteSubscriptionFailed,
    SubscriptionActions } from 'app/actions/subscription.actions';

export interface ISubscriptionState {
    subscriptionList: Array<Subscription>;
    eventId: string;
    isLoading: boolean;
    dataDate: Date;
}

export const initialState: ISubscriptionState = {
    subscriptionList: [],
    eventId: '',
    isLoading: false,
    dataDate: undefined
};

export function subscriptionsReducer(state: ISubscriptionState = initialState, action?: SubscriptionActions): ISubscriptionState {
    switch (action.type) {
        case SubscriptionActionTypes.getSubscriptionListStart:
        {
            const act = action as GetSubscriptionStart;

            return {
                ...state,
                isLoading: true,
                eventId: act.payload
            };
        }

        case SubscriptionActionTypes.getSubscriptionListFinished:
        {
            const act = action as GetSubscriptionFinished;
            return {
                ...state,
                subscriptionList: act.payload,
                isLoading: false,
                dataDate: new Date()
            };
        }

        case SubscriptionActionTypes.addSubscription:
        {
            const act = action as AddSubscription;
            act.payload.isStorePending = true;

            return {
                ...state,
                subscriptionList: [
                    ...state.subscriptionList,
                    act.payload
                ]
            };
        }

        case SubscriptionActionTypes.addSubscriptionFinished:
        {
            const act = action as AddSubscriptionFinished;
            const subscriptionList = state.subscriptionList.map( subsc => {
                if (subsc.user_id === act.payload.user_id
                    && subsc.event_id === act.payload.event_id) {
                        const newSub = new Subscription(subsc);
                        newSub.isStorePending = false;
                        return newSub;
                }
                return subsc;
            })
            return {
                ...state,
                subscriptionList
            };
        }

        case SubscriptionActionTypes.addSubscriptionFailed:
        {
            const act = action as AddSubscriptionFailed;
            return {
                ...state,
                subscriptionList: state.subscriptionList.filter(subsc => subsc.user_id !== act.payload.context.user_id)
            };
        }

        case SubscriptionActionTypes.updateSubscrList:
        {
            const act = action as UpdateSubscription;
            const subscriptionList = state.subscriptionList.map(
                (subscr) => (subscr.user_id === act.payload.user_id && subscr.event_id === act.payload.event_id)
                ? act.payload
                : subscr
            );

            return {
                ...state,
                subscriptionList
            };
        }

        case SubscriptionActionTypes.deleteSubscription:
        {
            const act = action as DeleteSubscription;
            const subscriptionList = state.subscriptionList.filter(
                subscr => !(subscr.event_id === act.payload.event_id && subscr.user_id === act.payload.user_id)
            );

            return {
                ...state,
                subscriptionList
            };
        }

        case SubscriptionActionTypes.deleteSubscriptionFailed:
        {
            const act = action as DeleteSubscriptionFailed;

            const subscriptionList = [
                ...state.subscriptionList,
                act.payload.context
            ];

            return {
                ...state,
                subscriptionList
            };
        }

        case SubscriptionActionTypes.resetSubscriptionState:
        {
            return { ...initialState };
        }

        default:
            return state;
    }
}
