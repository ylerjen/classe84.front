import { Action } from '@ngrx/store';

import { Address } from 'app/models/Address';

export enum addressActions {
    asyncAddresslistStart = '[AddressList] get',
    asyncAddresslistFinished = '[AddressList] get finished',
    asyncAddresslistFailed = '[AddressList] get failed',
    resetAddresslist = '[AddressList] reset',
    setFavoriteAddress = '[Address] set favorite',
    addAddressInAddresslist = '[Address] add in list',
    updateAddressInAddresslist = '[Address] update in list',
    deleteAddressFromAddresslist = '[Address] delete from list',
}

export interface UserAddressCmd {
    userId: string;
    addressId: string;
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

export class AddAddressInList implements Action {
    readonly type = addressActions.addAddressInAddresslist;
    constructor(public payload: Address) {}
}

export class UpdateAddressInList implements Action {
    readonly type = addressActions.updateAddressInAddresslist;
    constructor(public payload: Address) {}
}

export class DeleteAddressFromList implements Action {
    readonly type = addressActions.deleteAddressFromAddresslist;
    constructor(public payload: Address) {}
}

export class EmptyAddressList implements Action {
    readonly type = addressActions.resetAddresslist;
}

export class SetFavoriteAddress implements Action {
    readonly type = addressActions.setFavoriteAddress;
    constructor(public payload: UserAddressCmd) {}
}
