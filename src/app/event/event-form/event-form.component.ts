import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

import { Event as EventModel } from 'app/models/Event';
import { GeoService, IReverseGeoCodeResponse, IReverseGeoCodeResult } from '@shared/services/geo/geo.service';
import { Coordinates } from 'app/models/Coordinates';
import { CustomValidators } from '@shared/validators/CustomValidators';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

    private _event: EventModel;

    public compId: string;

    public eventForm: FormGroup;

    public georesults: Array<IReverseGeoCodeResult>;

    public choosenResult: number;

    public isLocationLoading = false;

    public isModalDisplayed: boolean;

    public minEndDate: Date = null;

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
        this._geoSrvc.reverseGeocode(location)
            .subscribe((geoResp: IReverseGeoCodeResponse) => {
                this.georesults = geoResp.results;
                console.log(this.georesults);
                if (Array.isArray(this.georesults) && this.georesults.length) {
                    if (this.georesults.length === 1) {
                        const geo1 = this.georesults[0] as IReverseGeoCodeResult;
                        const coord = geo1.geometry.location;
                        this.setLatLng(coord);
                    } else {
                        this.displayModalWithGeoResult()
                    }
                }
            });
    }

    setLatLng(coord: Coordinates): void {
        this.eventForm.controls.latitude.setValue(coord.lat);
        this.eventForm.controls.longitude.setValue(coord.lng);
    }

    defineEndDate(e): void {
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

    onGeoResultsChoosen(result: IReverseGeoCodeResult): void {
        this.onCloseModal();
        if (result) {
            this.setLatLng(result.geometry.location);
        }
    }

    onCloseModal(): void {
        this.isModalDisplayed = false;
    }
}
