import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment';
import { UserAddressCmd } from '../actions/addresslist.actions';
import { Address } from '@models/Address';

const BASE_URL = `${env.API_URL}`;

@Injectable()
export class AddressService {

    constructor(
        private _authHttp: HttpClient
    ) { }

    getAllForUser(userId: string): Observable<Array<Address>> {
        const route = `${BASE_URL}/users/${userId}/addresses`;
        return this._authHttp.get<Array<Address>>(route);
    }

    setAsDefault(userAdress: UserAddressCmd): Observable<{}> {
        const route = `${BASE_URL}/users/${userAdress.userId}/addresses/${userAdress.addressId}/default`;
        return this._authHttp.put(route, {});
    }
}
