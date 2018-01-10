import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

import { Event as EventModel } from '../../models/Event';
import { ISessionState } from 'app/stores/session/session.reducer';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

    private _event: EventModel;

    public compId: string;

    public eventForm: FormGroup;

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
    cancelEvent = new EventEmitter<number>();

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.compId = UUID.UUID();
    }    
    
    createForm() {
        if (!this.event) {
            return;
        }
        this.eventForm = this.fb.group({
            id: [this.event.id || ''],
            title: [this.event.title || '', Validators.required ],
            event_date: [this.event.event_date || '', Validators.required ],
            description: [this.event.description || '', Validators.required ],
            latitude: [this.event.latitude || '', Validators.required ],
            longitude: [this.event.longitude || '', Validators.required ],
            location: [this.event.location || '', Validators.required],
            link: [this.event.link || ''],
            price: [this.event.price || ''],
            organisator: [this.event.organisator || '', Validators.required]
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.saveEvent.emit(this.eventForm.value);
    }

    onCancel(event: MouseEvent) {
        event.preventDefault();
        this.cancelEvent.emit(this.event.id);
    }
}
