import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import 'rxjs/add/observable/of';
import { addressActions, GetAddressListAsyncFailed, GetAddressListAsyncFinished, UserAddressCmd } from 'app/actions/addresslist.actions';
import { ActionWithPayload } from '../actions/app.actions';
import { AddressService } from 'app/address/address.service';

@Injectable()
export class AddressEffects {

  @Effect()
  getAddressList$ = this.actions$
      .ofType(addressActions.asyncAddresslistStart)
      .map((action: Action) => {
          const act = action as ActionWithPayload<string>;
          return act.payload;
      })
      .switchMap(payload => this._addressService.getAllForUser(payload)
        .map((addrList) => new GetAddressListAsyncFinished(addrList))
        .catch((err: Error) => of(new GetAddressListAsyncFailed(err)))
      );

  @Effect()
  setDefaultAddress$ = this.actions$
      .ofType(addressActions.setFavoriteAddress)
      .map((action: Action) => {
          const act = action as ActionWithPayload<UserAddressCmd>;
          return act.payload;
      })
      .switchMap(payload => this._addressService.setAsDefault(payload)
        .map(res => ({type: 'defaultAddressSetted'}))
        .catch((err: Error) => of({type: 'defaultAddressFailed'}))
      );

    constructor(
        private _addressService: AddressService,
        private actions$: Actions
    ) { }
}