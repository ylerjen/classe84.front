import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Address } from 'app/models/Address';

@Component({
    selector: 'app-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {
    private _addressList: Array<Address> = [];

    @Input()
    set addressList(value: Array<Address>) {
        if (!value) {
            value = [];
        }
        this._addressList = value;
    }
    get addressList(): Array<Address> {
        return this._addressList;
    }

    @Output()
    public setFavoriteAddress = new EventEmitter<string>();

    @Output()
    public deleteAddress = new EventEmitter<string>();

    onSetFavoriteAddress(addressId: string) {
        this.setFavoriteAddress.emit(addressId);
    }
    onEditAddress(addressId: string) {
        throw new Error('not implemented');
    }
    onDeleteAddress(addressId: string) {
        this.deleteAddress.emit(addressId);
    }
}
