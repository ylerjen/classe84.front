import { createSelector } from '@ngrx/store';
import { UserModuleState, selectUserModuleState } from '../user.state';

export const selectUserlistState = createSelector(
    selectUserModuleState,
    (state: UserModuleState) => state.userlistState
);

export function selectUserlist(state: UserModuleState) {
    const userState = selectUserlistState(state);
    return userState ? userState.userList : null;
}
