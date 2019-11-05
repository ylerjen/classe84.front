import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapquestCoordinates } from '@shared/services/geo/MapquestCoordinates';
import { GeoService } from '@shared/services/geo/geo.service';
import { MapquestResultPayload, MapquestResult } from '@shared/services/geo/Mapquest';

@Component({
    selector: 'app-coordinates-form',
    templateUrl: './coordinates-form.component.html',
    styleUrls: ['./coordinates-form.component.scss']
})
export class CoordinatesFormComponent implements OnInit {
    private _coordinates: MapquestCoordinates;

    @Input()
    public baseForm: FormGroup;

    @Input()
    set coordinates(val: MapquestCoordinates) {
        this._coordinates = val;
        this.createForm();
    }
    get coordinates(): MapquestCoordinates {
        return this._coordinates;
    }

    @Input()
    public isFormReadonly = false;
    public georesults: Array<MapquestResult>;
    public isLocationLoading: boolean;
    public form: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _geoSrvc: GeoService
    ) { }

    ngOnInit() {
        this.createForm();
    }

    createForm(): void {
        if (!this.coordinates) {
            return;
        }
        this.form = this._fb.group({
            latitude: [this.coordinates.lat || '', Validators.required],
            longitude: [this.coordinates.lng || '', Validators.required],
        });
        this.baseForm.addControl('coordinates', this.form);
    }

    searchCoordinates(event: Event): void {
        event.preventDefault();
        const location = this.form.value.location;
        this.isLocationLoading = true;
        this._geoSrvc.reverseGeocodeMapQuest(location)
            .subscribe((geoResp: MapquestResultPayload) => {
                this.georesults = geoResp.results;
                console.log(this.georesults);
                if (Array.isArray(this.georesults) && this.georesults.length) {
                    if (this.georesults.length && this.georesults[0].locations.length) {
                        const geo1 = this.georesults[0] as MapquestResult;
                        const coord = geo1.locations[0].latLng;
                        this.setLatLng(coord);
                    } else {
                        this.setLatLng(null);
                    }
                }
            });
    }



    /**
     * Set the lat/lng coordinates values in the form
     * @param coord - are the lat/lng coordinates to set in the form
     */
    setLatLng(coord: MapquestCoordinates = {lat: '', lng: ''}): void {
        if (!coord || !coord.lat || !coord.lng) {
            coord = {lat: '', lng: ''};
        }
        this.form.controls.latitude.setValue(coord.lat);
        this.form.controls.longitude.setValue(coord.lng);
    }
}
