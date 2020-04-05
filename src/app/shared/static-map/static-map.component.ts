import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

import { MapquestCoordinates } from '@shared/services/geo/MapquestCoordinates';
import { mapLinkBuilder } from '@shared/services/geo/geo.service';

@Component({
    selector: 'app-static-map',
    templateUrl: './static-map.component.html',
    styleUrls: ['./static-map.component.scss']
})
export class StaticMapComponent implements OnChanges {

    public mapPath: URL;
    @Input() public coordinates: MapquestCoordinates;
    @Input() public size: number;

    ngOnChanges(changes: SimpleChanges) {
        if (!this.coordinates.lat || !this.coordinates.lng) {
            return;
        }
        this.mapPath = mapLinkBuilder(this.coordinates, this.size);
    }
}
