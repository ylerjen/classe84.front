import { Action } from '@ngrx/store';

import { Session } from 'app/models/Session';
import { SessionActions } from 'app/actions/session.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface ISessionState {
    isLoggedIn: boolean;
    session: Session;
    isProcessing: boolean;
}

export const initialState: ISessionState = {
    isLoggedIn: false,
    session: null,
    isProcessing: false
};

export function sessionReducer(state = initialState, action: Action): ISessionState {
    switch (action.type) {
        case SessionActions.Login:
        {
            return Object.assign({}, state, {
                isProcessing: true
            });
        }

        case SessionActions.LoginFinished:
        case SessionActions.SetExistingSession:
        {
            const act = action as ActionWithPayload<ISessionState>;
            return Object.assign({}, state, {
                isLoggedIn: true,
                session: act.payload,
                isProcessing: false
            });
        }

        case SessionActions.Logout:
            return initialState;

        default:
            return state;
    }
}
