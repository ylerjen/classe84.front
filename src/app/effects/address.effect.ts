
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import {
    addressActions,
    GetAddressListAsyncFailed,
    GetAddressListAsyncFinished,
    DeleteAddressById,
    GetAddressListAsync,
    SetFavoriteAddress,
    CreateAddressForUserIdCmd,
    AddressCreated,
    CreateAddressForUser
} from 'app/actions/addresslist.actions';
import { AddressService } from 'app/address/services/address.service';

@Injectable()
export class AddressEffects {

    @Effect()
    getAddressList$ = this.actions$.pipe(
        ofType(addressActions.asyncAddresslistStart),
        map((action: Action) => {
            const act = action as GetAddressListAsync;
            return act.payload;
        }),
        switchMap(payload => this._addressService.getAllForUser(payload).pipe(
            map((addrList) => new GetAddressListAsyncFinished(addrList)),
            catchError((err: Error) => of(new GetAddressListAsyncFailed(err))),
        )),
    );

    @Effect()
    setDefaultAddress$ = this.actions$.pipe(
        ofType(addressActions.setFavoriteAddress),
        map((action: Action) => {
            const act = action as SetFavoriteAddress;
            return act.payload;
        }),
        switchMap(payload => this._addressService.setAsDefault(payload).pipe(
            map(res => ({ type: 'defaultAddressSetted' })),
            catchError((err: Error) => of({ type: 'defaultAddressFailed' }))
        ))
    );

    @Effect()
    deleteAddress$ = this.actions$.pipe(
        ofType(addressActions.deleteAddressFromAddresslist),
        map((action: Action) => (action as DeleteAddressById).payload),
        switchMap(payload => this._addressService.deleteById(payload).pipe(
            map(res => ({ type: 'addressDeleted' })),
            catchError((err: Error) => of({ type: 'addressDeletionFailed' }))
        ))
    );

    @Effect()
    createAddressForUser$ = this.actions$.pipe(
        ofType(addressActions.createAddressForUser),
        map((action: Action) => (action as CreateAddressForUser).payload),
        mergeMap(payload => this._addressService.createForUser(payload.userId, payload.address).pipe(
            map(res => new AddressCreated(res)),
            catchError((err: Error) => of({ type: 'addressCreationFailed' }))
        ))
    );

    constructor(
        private _addressService: AddressService,
        private actions$: Actions
    ) { }
}
