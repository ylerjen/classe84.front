import { Action } from '@ngrx/store';

import { Version } from '../models/Version';

export enum AppActionTypes {
    getApiVersion = '[app] get api version',
    getApiVersionFinished = '[app] get api version finished',
    getFrontVersion = '[app] get front version'
}

export class GetApiVersion implements Action {
    readonly type = AppActionTypes.getApiVersion;
}

export class GetApiVersionFinished implements Action {
    readonly type = AppActionTypes.getApiVersionFinished;
    constructor(public payload: Version) { }
}

export class StoreFrontVersion implements Action {
    readonly type = AppActionTypes.getFrontVersion;
    constructor(public payload: Version) { }
}

export type AppActions = GetApiVersion
    | GetApiVersionFinished
    | StoreFrontVersion;
