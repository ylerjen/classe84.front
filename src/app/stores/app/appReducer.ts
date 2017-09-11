import { ActionReducer, Action } from '@ngrx/store';

import { STORE_API_VERSION, STORE_FRNT_VERSION } from '../../actions/app.actions';
import { Version } from '../../models/Version';


const initialVersion = 'x.x.x';

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
        case STORE_API_VERSION:
            state = Object.assign({}, state);
            version = Object.assign({}, state.version, { api: action.payload});
            return Object.assign(state, { version });

        case STORE_FRNT_VERSION:
            state = Object.assign({}, state);
            version = Object.assign({}, state.version, { front: action.payload});
            return Object.assign(state, { version });

        default:
            return state;
    }
}
