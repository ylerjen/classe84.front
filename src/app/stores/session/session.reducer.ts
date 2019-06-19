import { Session } from 'app/models/Session';
import { SessionActionTypes,
    AddFormErrorsAction,
    LoginFailedAction,
    SessionActions,
    SetExistingSession,
    LoginFinishedAction } from 'app/actions/session.actions';

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

export function sessionReducer(state: ISessionState = initialState, action: SessionActions): ISessionState {
    switch (action.type) {
        case SessionActionTypes.Login: {
            return {
                ...state,
                isProcessing: true,
                errors: []
            };
        }

        case SessionActionTypes.LoginFinished:
        case SessionActionTypes.SetExistingSession: {
            const act = action as LoginFinishedAction | SetExistingSession;
            return {
                ...state,
                isLoggedIn: true,
                session: act.payload,
                isProcessing: false
            };
        }

        case SessionActionTypes.AddFormErrors: {
            const act = action as AddFormErrorsAction;
            return {
                ...state,
                errors: state.errors.concat(act.payload)
            };
        }

        case SessionActionTypes.EmptyFormErrors: {
            return {
                ...state,
                errors: []
            };
        }

        case SessionActionTypes.Logout:
        case SessionActionTypes.SessionExpired: {
            return initialState;
        }

        case SessionActionTypes.LoginFailed: {
            const act = action as LoginFailedAction;
            return { ...initialState };
        }
        default:
            return state;
    }
}
