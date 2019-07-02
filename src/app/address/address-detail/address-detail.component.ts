import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Address } from 'app/models/Address';
import { mapQuestKey } from 'app/shared/services/geo/geo.service';

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

    @Output()
    public editEmitter = new EventEmitter<string>();

    @Output()
    public deleteEmitter = new EventEmitter<string>();

    public mapQuestKey = mapQuestKey;

    setFavorite(evt: Event) {
        evt.preventDefault();
        this.setFavoriteEmitter.emit(this.address.id.toString());
    }

    edit(evt: Event) {
        evt.preventDefault();
        this.editEmitter.emit(this.address.id.toString());
    }

    delete(evt: Event) {
        evt.preventDefault();
        this.deleteEmitter.emit(this.address.id.toString());
    }
}
