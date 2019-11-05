import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { UserAddressCmd } from '../../actions/addresslist.actions';
import { Address } from '@models/Address';
import { map, tap } from 'rxjs/operators';

const BASE_URL = `${env.API_URL}`;

@Injectable()
export class AddressService {

    constructor(
        private _authHttp: HttpClient
    ) { }

    getAllForUser(userId: string): Observable<Array<Address>> {
        const route = `${BASE_URL}/users/${userId}/addresses`;
        return this._authHttp.get<Array<Address>>(route)
            .pipe(
                map( (addrList: Array<Address>) => addrList.map( adr => new Address(adr))),
                tap( (addrList: Array<Address>) => addrList.sort((a: Address, b: Address) => {
                    // default address first
                    if (!a.is_default && b.is_default) {
                        return 1;
                    }
                    if (a.is_default && !b.is_default) {
                        return -1;
                    }
                    return 0;
                }))
            );
    }

    setAsDefault(userAdress: UserAddressCmd): Observable<{}> {
        const route = `${BASE_URL}/users/${userAdress.userId}/addresses/${userAdress.addressId}/default`;
        return this._authHttp.put(route, {});
    }

    deleteById(id: string): Observable<Object> {
        const route = `${BASE_URL}/addresses/${id}`;
        return this._authHttp.delete(route);
    }
}
