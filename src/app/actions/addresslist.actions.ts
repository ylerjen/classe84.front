import { Action } from '@ngrx/store';

import { Address } from 'app/models/Address';
import { ActionWithPayload } from './app.actions';

export enum addressActions {
    setFavoriteAddress = 'SET_FAVORITE_ADDRESS',
    asyncAddresslistStart = 'ASYNC_ADDRESSLIST_START',
    asyncAddresslistFinished = 'ASYNC_ADDRESSLIST_FINISHED',
    asyncAddresslistFailed = 'ASYNC_ADDRESSLIST_FAILED',
    resetAddresslist = 'RESET_ADDRESSLIST',
    addAddressInAddresslist = 'ADD_ADDRESS_IN_ADDRESSLIST',
    updateAddressInAddresslist = 'UPDATE_ADDRESS_IN_ADDRESSLIST',
    deleteAddressFromAddresslist = 'DELETE_ADDRESS_FROM_ADDRESSSLIST',
}

export interface UserAddressCmd {
    userId: string;
    addressId: string;
}

export function getAddressListAsync(userId: string): ActionWithPayload<string> {
    return {
        type: addressActions.asyncAddresslistStart,
        payload: userId
    };
}

export function getAddressListAsyncFinished(payload: Array<Address>): ActionWithPayload<Array<Address>> {
    return {
        type: addressActions.asyncAddresslistFinished,
        payload
    };
}

export function getAddressListAsyncFailed(payload: Error): ActionWithPayload<Error> {
    return {
        type: addressActions.asyncAddresslistFailed,
        payload
    };
}

export function addAddressInList(payload: Address): ActionWithPayload<Address> {
    return {
        type: addressActions.addAddressInAddresslist,
        payload
    };
}

export function updateAddressInList(payload: Address): ActionWithPayload<Address> {
    return {
        type: addressActions.updateAddressInAddresslist,
        payload
    };
}

export function deleteAddressFromList(payload: Address): ActionWithPayload<Address> {
    return {
        type: addressActions.deleteAddressFromAddresslist,
        payload
    };
}

export function emptyAddressList(): Action {
    return { type: addressActions.resetAddresslist };
}

export function setFavoriteAddress(payload: UserAddressCmd): ActionWithPayload<UserAddressCmd> {
    return {
        type: addressActions.setFavoriteAddress,
        payload
    };
}
