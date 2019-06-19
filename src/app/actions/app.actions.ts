import { Action } from '@ngrx/store';

import { Version } from '../models/Version';

export enum AppActions {
    getApiVersion = '[app] get api version',
    getApiVersionFinished = '[app] get api version finished',
    getFrontVersion = '[app] get front version'
}

export class GetApiVersion implements Action {
    readonly type = AppActions.getApiVersion;
}

export class GetApiVersionFinished implements Action {
    readonly type = AppActions.getApiVersionFinished;
    constructor(public payload: Version) { }
}

export class StoreFrontVersion implements Action {
    readonly type = AppActions.getFrontVersion;
    constructor(public payload: Version) { }
}

export type AppActionsClass = GetApiVersion
    | GetApiVersionFinished
    | StoreFrontVersion;
