import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Address } from 'app/models/Address';

@Component({
    selector: 'app-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {

    @Input()
    public addressList: Address[] = [];

    @Output()
    public setFavoriteAddress = new EventEmitter<string>();

    onSetFavoriteAddress(addressId: string) {
        this.setFavoriteAddress.emit(addressId);
    }
}
