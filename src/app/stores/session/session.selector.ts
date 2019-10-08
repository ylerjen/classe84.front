import { SessionState } from './session.reducer';
import { User } from '@models/User';
import { GlobalState } from '../globalState';
import { Session } from '@models/Session';

export function selectLoggedUser(state: GlobalState): User {
    const sessionState = selectSession(state);
    return sessionState && sessionState.user;
}

export function selectSessionState(state: GlobalState): SessionState {
    return state.sessionState;
}

export function selectSession(state: GlobalState): Session {
    return state.sessionState.session;
}
