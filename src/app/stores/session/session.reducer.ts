import { Action } from '@ngrx/store';

import { SessionUser } from 'app/models/SessionUser';
import { SessionActions } from 'app/actions/session.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface ISessionState {
    isLoggedIn: boolean;
    loggedUser: SessionUser;
    token: string;
}

export const initialState: ISessionState = {
    isLoggedIn: false,
    loggedUser: null,
    token: ''
};

export function sessionReducer(state = initialState, action: Action): ISessionState {
    switch (action.type) {
        case SessionActions.Login:
        {
            const act = action as ActionWithPayload<ISessionState>;
            return Object.assign({}, state, {
                isLoggedIn: true,
                loggedUser: act.payload.loggedUser,
                token: act.payload.token
            });
        }

        case SessionActions.Logout:
            return initialState;

        case SessionActions.SetUser:
        {
            const act = action as ActionWithPayload<SessionUser>;
            return Object.assign({}, state, {
                loggedUser: act.payload
            });
        }

        default:
            return state;
    }
}
