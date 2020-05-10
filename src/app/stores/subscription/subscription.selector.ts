import { GlobalState } from '../globalState';
import { ISubscriptionState } from './subscription.reducer';

export function selectSubscriptionState(state: GlobalState): ISubscriptionState {
    return state.subscriptionsState;
}
