import { ActionReducer, Action } from '@ngrx/store';

import { STORE_API_VERSION, STORE_FRNT_VERSION } from '../../actions/app.actions';


const initialVersion = 'x.x.x';

export interface AppVersion {
    front: string;
    api: {
        full: string,
        major: string,
        minor: string,
        patch: string
    };
}

export interface AppState {
    version: AppVersion;
}

export const initialState: AppState = {
    version: {
        api: { full: initialVersion, minor: 'x', major: 'x', patch: 'x' },
        front: initialVersion
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
