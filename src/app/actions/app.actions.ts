import { Action } from '@ngrx/store';

import { Version } from '../models/Version';

export const STORE_API_VERSION = 'STORE_API_VERSION';
export const STORE_FRNT_VERSION = 'STORE_FRNT_VERSION';

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export function storeApiVersion(payload: Version): ActionWithPayload<Version> {
    return { type: STORE_API_VERSION, payload };
}

export function storeFrontVersion(payload: Version): ActionWithPayload<Version> {
    return { type: STORE_FRNT_VERSION, payload };
}
