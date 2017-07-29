import { ActionReducer, Action } from '@ngrx/store';

export const STORE_API_VERSION = 'STORE_API_VERSION';
export const STORE_FRNT_VERSION = 'STORE_FRNT_VERSION';

export function storeApiVersion(payload: string): Action {
    return { type: STORE_API_VERSION, payload };
}

export function storeFrontVersion(payload: string): Action {
    return { type: STORE_FRNT_VERSION, payload };
}
