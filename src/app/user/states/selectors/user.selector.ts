import { createSelector } from '@ngrx/store';
import { UserModuleState, selectUserModuleState } from '../user.state';

export const selectUserState = createSelector(
    selectUserModuleState,
    (state: UserModuleState) => state.userState
);

export function selectUser(state: UserModuleState) {
    const userState = selectUserState(state);
    return userState ? userState.user : null;
}
