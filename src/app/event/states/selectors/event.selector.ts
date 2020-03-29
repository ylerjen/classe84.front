import { GlobalState } from '../../../stores/globalState';
import { EventState } from '../reducers/event/event.reducer';

export function selectEventState(state: GlobalState): EventState {
    return state.eventState;
}
