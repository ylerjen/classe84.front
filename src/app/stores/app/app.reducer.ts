import { Action } from '@ngrx/store';
import { tassign } from 'tassign';

import { ActionWithPayload, AppActions } from 'app/actions/app.actions';
import { Version } from 'app/models/Version';


const initialVersion = '0.0.0';

export interface AppVersion {
    front: Version;
    api: Version;
}

export interface AppState {
    version: AppVersion;
}

export const initialState: AppState = {
    version: {
        api: new Version(initialVersion),
        front: new Version(initialVersion)
    }
};

export function appReducer(state: AppState = initialState, action: Action): AppState {
    let version: AppVersion;
    switch (action.type) {
        case AppActions.getApiVersionFinished:
        {
            const act = action as ActionWithPayload<Version>;
            state = tassign(state);
            version = tassign(state.version, { api: act.payload});
            return {
                ...state,
                version
            };
        }

        case AppActions.getFrontVersion:
        {
            const act = action as ActionWithPayload<Version>;
            state = tassign(state);
            version = tassign(state.version, { front: act.payload});
            return {
                ...state,
                version
            };
        }

        default:
            return state;
    }
}
