import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Address } from 'app/models/Address';

@Component({
    selector: 'app-address-detail',
    templateUrl: './address-detail.component.html',
    styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent {
    @Input()
    public address: Address;

    @Output()
    public setFavoriteEmitter = new EventEmitter<string>();

    setFavorite(evt: Event) {
        evt.preventDefault();
        this.setFavoriteEmitter.emit(this.address.id.toString());
    }
}
