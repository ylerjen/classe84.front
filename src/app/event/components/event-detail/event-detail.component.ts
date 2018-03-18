import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Event } from 'app/models/Event';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {

    @Input()
    public event: Event;

    @Output()
    goToEditEvent = new EventEmitter<string>();

    @Output()
    deleteEvent = new EventEmitter<string>();

    onClickEdit(): void {
        if (this.event) {
            this.goToEditEvent.emit(this.event.id);
        }
    }

    onClickDelete(): void {
        if (this.event) {
            this.deleteEvent.emit(this.event.id);
        }
    }
}
