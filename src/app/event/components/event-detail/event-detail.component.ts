import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Event } from '../../../models/Event';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {

    @Input()
    public event: Event;    

    @Output()
    goToEditEvent = new EventEmitter<number>();

    @Output()
    deleteEvent = new EventEmitter<number>();

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
