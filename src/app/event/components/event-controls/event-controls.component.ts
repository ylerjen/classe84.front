import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-event-controls',
    templateUrl: './event-controls.component.html',
    // styleUrls: ['./event-controls.component.scss']
})
export class EventControlsComponent {

    @Input()
    public eventId: string;

    @Input()
    public canEdit: boolean;

    @Input()
    public canDelete: boolean;

    @Input()
    public isSubscribed: boolean;

    @Input()
    public isSubscribable: boolean;

    @Output()
    public goToEditEvent = new EventEmitter();

    @Output()
    public deleteEvent = new EventEmitter();

    @Output()
    public subscribeToEvent = new EventEmitter();

    @Output()
    public unsubscribeFromEvent = new EventEmitter();

    delete(evt: Event): void {
        evt.preventDefault();
        if (confirm('Etes-vous sûr de vouloir supprimer cet évènement ?')) {
            this.deleteEvent.emit(this.eventId);
        }
    }

    subscribe(evt: Event): void {
        evt.preventDefault();
        this.subscribeToEvent.emit(this.eventId);
    }

    unsubscribe(evt: Event): void {
        evt.preventDefault();
        this.unsubscribeFromEvent.emit(this.eventId);
    }
}
