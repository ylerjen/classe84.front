import { Action } from '@ngrx/store';

import { Address } from 'app/models/Address';

export enum addressActions {
    asyncAddresslistStart = '[AddressList] get',
    asyncAddresslistFinished = '[AddressList] get finished',
    asyncAddresslistFailed = '[AddressList] get failed',
    resetAddresslist = '[AddressList] reset',
    setFavoriteAddress = '[Address] set favorite',
    createAddressForUser = '[Address] add for user',
    addressCreated = '[Address] created',
    updateAddressInAddresslist = '[Address] update in list',
    deleteAddressFromAddresslist = '[Address] delete from list',
}

export interface UserAddressCmd {
    userId: string;
    addressId: string;
}

export interface CreateAddressForUserIdCmd {
    address: Address;
    userId: string;
}

export class GetAddressListAsync implements Action {
    readonly type = addressActions.asyncAddresslistStart;
    constructor(public payload: string) {}
}

export class GetAddressListAsyncFinished implements Action {
    readonly type = addressActions.asyncAddresslistFinished;
    constructor(public payload: Array<Address>) {}
}

export class GetAddressListAsyncFailed implements Action {
    readonly type = addressActions.asyncAddresslistFailed;
    constructor(public payload: Error) {}
}

export class CreateAddressForUser implements Action {
    readonly type = addressActions.createAddressForUser;
    constructor(public payload: CreateAddressForUserIdCmd) {}
}

export class AddressCreated implements Action {
    readonly type = addressActions.addressCreated;
    constructor(public payload: Address) {}
}

export class UpdateAddressInList implements Action {
    readonly type = addressActions.updateAddressInAddresslist;
    constructor(public payload: Address) {}
}

/**
 * Action to delete an address by its id
 */
export class DeleteAddressById implements Action {
    readonly type = addressActions.deleteAddressFromAddresslist;
    constructor(public payload: string) {}
}

export class EmptyAddressList implements Action {
    readonly type = addressActions.resetAddresslist;
}

export class SetFavoriteAddress implements Action {
    readonly type = addressActions.setFavoriteAddress;
    constructor(public payload: UserAddressCmd) {}
}

export type AddressListActions = GetAddressListAsync
    | GetAddressListAsyncFinished
    | GetAddressListAsyncFailed
    | CreateAddressForUser
    | AddressCreated
    | UpdateAddressInList
    | EmptyAddressList
    | SetFavoriteAddress
    | DeleteAddressById;
