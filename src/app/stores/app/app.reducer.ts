import { AppActions, AppActionTypes, GetApiVersionFinished, StoreFrontVersion } from 'app/actions/app.actions';
import { Version } from '@models/Version';


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

export function appReducer(state: AppState = initialState, action: AppActions): AppState {
    let version: AppVersion;
    switch (action.type) {
        case AppActionTypes.getApiVersionFinished:
        {
            const act = action as GetApiVersionFinished;
            state = { ...state };
            version = {
                ...state.version,
                api: act.payload
            };
            return {
                ...state,
                version
            };
        }

        case AppActionTypes.getFrontVersion:
        {
            const act = action as StoreFrontVersion;
            state = { ...state };
            version = {
                ...state.version,
                front: act.payload
            };
            return {
                ...state,
                version
            };
        }

        default:
            return state;
    }
}
