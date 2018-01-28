import { Action } from '@ngrx/store';

import { Version } from '../models/Version';

export const STORE_API_VERSION = 'STORE_API_VERSION';
export const STORE_FRNT_VERSION = 'STORE_FRNT_VERSION';

export function storeApiVersion(payload: Version): Action {
    return { type: STORE_API_VERSION, payload };
}

export function storeFrontVersion(payload: Version): Action {
    return { type: STORE_FRNT_VERSION, payload };
}
