import { GlobalState } from 'app/stores/globalState';
import { IUserState } from '../user.reducer';

export function selectUserState(state: GlobalState): IUserState {
    return state ? state.userState : null;
}

export function selectUser(state: GlobalState) {
    const userState = selectUserState(state);
    return userState ? userState.user : null;
}
