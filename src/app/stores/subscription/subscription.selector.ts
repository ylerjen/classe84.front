import { GlobalState } from '../globalState';
import { ISubscriptionState } from './subscription.reducer';

export function selectSubscription(state: GlobalState): ISubscriptionState {
    return state.subscriptionsState;
}
