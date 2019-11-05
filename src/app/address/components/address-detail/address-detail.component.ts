import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Address } from 'app/models/Address';
import { mapQuestKey, mapLinkBuilder } from 'app/shared/services/geo/geo.service';
import { MapquestCoordinates } from 'app/shared/services/geo/MapquestCoordinates';

const mapSize = 400;
const marker = 'marker';

@Component({
    selector: 'app-address-detail',
    templateUrl: './address-detail.component.html',
    styleUrls: ['./address-detail.component.scss'],
    animations: []
})
export class AddressDetailComponent {
    private _address: Address;

    /**
     * The boolean used to toggle the visibility of the map detail
     */
    public isMapVisible = false;

    /**
     * The url of the static map img related to the address 
     */
    public mapLink: URL;

    @Input()
    set address(value: Address) {
        this._address = value;
        const coord = new MapquestCoordinates(value.latitude, value.longitude);
        this.mapLink = mapLinkBuilder(coord, mapSize, marker);
    }
    get address(): Address {
        return this._address;
    }

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
        debugger;
        throw 'implement open modal here '
        this.editEmitter.emit(this.address.id.toString());
    }

    delete(evt: Event) {
        evt.preventDefault();
        this.deleteEmitter.emit(this.address.id.toString());
    }

    /**
     * Toggle the visibility of the details like the map and the interaction buttons
     * @param evt - The click event
     */
    toggleMap(evt: Event) {
        evt.preventDefault();
        this.isMapVisible = ! this.isMapVisible;
    }
}
