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
        if (!id) {
            throw new Error(`Can't delete an address without any id`);
        }
        const route = `${BASE_URL}/addresses/${id}`;
        return this._authHttp.delete(route);
    }

    createForUser(userId: string, address: Address): Observable<Address> {
        if (!userId) {
            throw new Error(`Can't create an address without user id`);
        }
        if (!address) {
            throw new Error(`Can't create an empty address`);
        }
        const route = `${BASE_URL}/users/${userId}/addresses`;
        return this._authHttp.post<Address>(route, address);
    }

    /**
     * Update an address by it's id
     * @param address - the address to update
     */
    updateAddress(address: Address): Observable<void> {
        if (!address || !address.id) {
            throw new Error(`Can't update an address with an empty id`);
        }
        const route = `${BASE_URL}/addresses/${address.id}`;
        return this._authHttp.put<void>(route, address);
    }
}
