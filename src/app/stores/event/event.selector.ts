import { GlobalState } from '../globalState';
import { EventState } from './event.reducer';

export function selectEventState(state: GlobalState): EventState {
    return state.eventState;
}
