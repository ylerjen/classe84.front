import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { Event as EventModel } from '@models/Event';
import { GeoService } from '@shared/services/geo/geo.service';
import { CustomValidators } from '@shared/validators/CustomValidators';
import { MapquestResultPayload, MapquestResult, MapquestResultLocations } from '@shared/services/geo/Mapquest';
import { MapquestCoordinates } from '@shared/services/geo/MapquestCoordinates';
import { mapQuestKey, mapQuestMapUrl } from '@shared/services/geo/geo.service';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

    private _event: EventModel;

    public compId: string;
    public eventForm: FormGroup;
    public georesults: Array<MapquestResult>;
    public choosenResult: number;
    public isLocationLoading = false;
    public isModalDisplayed: boolean;
    public minEndDate: Date = null;
    public mapQuestKey = mapQuestKey;
    public mapPath = '';

    @Input()
    set event(val: EventModel) {
        this._event = val;
        this.createForm();
    }
    get event(): EventModel {
        return this._event;
    }

    @Output()
    saveEvent = new EventEmitter<EventModel>();

    @Output()
    cancelEvent = new EventEmitter<string>();

    static eventToCoordinate(event: EventModel): MapquestCoordinates {
        return  {
            lat: event.latitude ? event.latitude.toString() : '',
            lng: event.longitude ? event.longitude.toString() : '',
        };
    }

    constructor(
        private _fb: FormBuilder,
        private _geoSrvc: GeoService
    ) { }

    ngOnInit(): void {
        this.compId = UUID.UUID();
    }

    createForm(): void {
        if (!this.event) {
            return;
        }
        this.eventForm = this._fb.group(
            {
                id: [this.event.id || ''],
                title: [this.event.title || '', Validators.required ],
                start_date: [this.event.start_date || '', Validators.required ],
                end_date: [this.event.end_date || '', Validators.required ],
                description: [this.event.description || '', Validators.required ],
                latitude: [this.event.latitude || '', Validators.required ],
                longitude: [this.event.longitude || '', Validators.required ],
                location: [this.event.location || '', Validators.required],
                link: [this.event.link || ''],
                price: [this.event.price || ''],
                organisator: [this.event.organisator || '', Validators.required]
            }, {
                validator: CustomValidators.endDateIsGreaterOrEqualThanStartDateValidator('start_date', 'end_date')
            }
        );
        this.setMap(EventFormComponent.eventToCoordinate(this.event));
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        this.saveEvent.emit(this.eventForm.value);
    }

    onCancel(event: MouseEvent): void {
        event.preventDefault();
        this.cancelEvent.emit(this.event.id);
    }

    searchLocation(event: Event): void {
        event.preventDefault();
        const location = this.eventForm.value.location;
        this.isLocationLoading = true;
        this._geoSrvc.reverseGeocodeMapQuest(location)
            .subscribe((geoResp: MapquestResultPayload) => {
                this.georesults = geoResp.results;
                console.log(this.georesults);
                if (Array.isArray(this.georesults) && this.georesults.length) {
                    if (this.georesults.length > 1) {
                        this.displayModalWithGeoResult();
                    } else if (this.georesults.length && this.georesults[0].locations.length) {
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
        this.eventForm.controls.latitude.setValue(coord.lat);
        this.eventForm.controls.longitude.setValue(coord.lng);
        this.setMap(coord);
    }

    /**
     * Set the map coordinate to refresh the image
     * @param coord - the coordinate to center the map
     */
    setMap(coord: MapquestCoordinates): void {
        if (!coord || !coord.lat || !coord.lng) {
            this.mapPath = '';
            return;
        }
        const mapUrl = new URL(mapQuestMapUrl);
        mapUrl.searchParams.set('key', this.mapQuestKey);
        mapUrl.searchParams.set('center', `${coord.lat},${coord.lng}`);
        this.mapPath = mapUrl.toString();
    }

    /**
     * When the start date changes, we have to set that date as default in the endDate if empty
     * @param newDate - is the new date defined in the start date
     */
    onStartDateChanged(newDate: Date): void {
        const startDate = this.eventForm.get('start_date').value;
        const endDateCtrl = this.eventForm.get('end_date')
        const endDate = endDateCtrl.value;
        if (!endDate) {
            endDateCtrl.setValue(startDate);
        }
    }

    displayModalWithGeoResult(): void {
        this.isModalDisplayed = true;
    }

    onGeoResultsChoosen(result: MapquestResultLocations): void {
        this.onCloseModal();
        if (result) {
            this.setLatLng(result.latLng);
        }
    }

    onCloseModal(): void {
        this.isModalDisplayed = false;
    }
}
