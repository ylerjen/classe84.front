import { Action } from '@ngrx/store';

import { Version } from '../models/Version';

export enum AppActions {
    getApiVersion = '[app] get api version',
    getApiVersionFinished = '[app] get api version finished',
    getFrontVersion = '[app] get front version'
}

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function getApiVersion(): Action {
    return { type: AppActions.getApiVersion };
}

export function getApiVersionFinished(payload: Version): ActionWithPayload<Version> {
    return { type: AppActions.getApiVersionFinished, payload };
}

export function storeFrontVersion(payload: Version): ActionWithPayload<Version> {
    return { type: AppActions.getFrontVersion, payload };
}
