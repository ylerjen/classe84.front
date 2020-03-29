import { createSelector } from '@ngrx/store';
import { selectEventModuleState, EventModuleState } from '../event.state';

export const selectEventlistState = createSelector(
    selectEventModuleState,
    (state: EventModuleState) => state.eventlistState
);

export function selectEventlist(state: EventModuleState) {
    const userState = selectEventlistState(state);
    return userState ? userState.eventList : null;
}
