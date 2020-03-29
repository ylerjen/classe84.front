import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UUID } from 'angular2-uuid';
import { Address } from '@models/Address';
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
     * The id of the current component to make it unique
     */
    public compId: string;

    /**
     * The boolean used to toggle the visibility of the map detail and actions
     */
    public isDetailCollapsed = true;

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

    constructor() {
        this.compId = UUID.UUID();
    }

    /**
     * Set the current address as the default one
     * @param evt - the click event
     */
    setAsFavorite(evt: Event) {
        evt.preventDefault();
        this.setFavoriteEmitter.emit(this.address.id);
    }

    /**
     * action to edit the current address
     * @param evt - the click event
     */
    edit(evt: Event) {
        evt.preventDefault();
        this.editEmitter.emit(this.address.id);
    }

    /**
     * Action to delete the current address
     * @param evt - the click event
     */
    delete(evt: Event) {
        evt.preventDefault();
        this.deleteEmitter.emit(this.address.id);
    }

    /**
     * Toggle the visibility of the details like the map and the interaction buttons
     * @param evt - The click event
     */
    toggleDetail(evt: Event) {
        evt.preventDefault();
        this.isDetailCollapsed = ! this.isDetailCollapsed;
    }
}
