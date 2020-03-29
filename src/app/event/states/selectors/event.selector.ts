import { createSelector } from '@ngrx/store';
import { selectEventModuleState, EventModuleState } from '../event.state';

export const selectEventState = createSelector(
    selectEventModuleState,
    (state: EventModuleState) => state.eventState
);

export function selectEvent(state: EventModuleState) {
    const userState = selectEventState(state);
    return userState ? userState.event : null;
}
