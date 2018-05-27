import { Action } from '@ngrx/store';
import { tassign } from 'tassign';

import { Session } from 'app/models/Session';
import { SessionActions } from 'app/actions/session.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface ISessionState {
    isLoggedIn: boolean;
    session: Session;
    isProcessing: boolean;
    errors: Array<string>;
}

export const initialState: ISessionState = {
    isLoggedIn: false,
    session: null,
    isProcessing: false,
    errors: []
};

export function sessionReducer(state: ISessionState = initialState, action: Action): ISessionState {
    switch (action.type) {
        case SessionActions.Login:
        {
            return tassign(state, {
                isProcessing: true
            });
        }

        case SessionActions.LoginFinished:
        case SessionActions.SetExistingSession:
        {
            const act = action as ActionWithPayload<Session>;
            return tassign(state, {
                isLoggedIn: true,
                session: act.payload,
                isProcessing: false
            });
        }

        case SessionActions.AddFormErrors:
        {
            const act = action as ActionWithPayload<Array<string>>;
            return tassign(state, { errors: state.errors.concat(act.payload) });
        }

        case SessionActions.EmptyFormErrors:
        {
            return tassign( state, { errors: [] });
        }

        case SessionActions.Logout:
        case SessionActions.LoginFailed:
            return initialState;

        default:
            return state;
    }
}
