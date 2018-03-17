import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../environments/environment';
import { UserAddressCmd } from '../actions/addresslist.actions';

const BASE_URL = `${env.API_URL}`;

@Injectable()
export class AddressService {

    constructor(
        private _http: Http,
        private _authHttp: AuthHttp
    ) { }

    getAllForUser(userId: string): Observable<Response> {
        const route = `${BASE_URL}/users/${userId}/addresses`;
        return this._authHttp.get(route);
    }

    setAsDefault(userAdress: UserAddressCmd) {
        const route = `${BASE_URL}/users/${userAdress.userId}/addresses/${userAdress.addressId}/default`;
        return this._authHttp.put(route, {});
    }
}
