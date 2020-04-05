import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { routeBuilder } from 'app/config/router.config';

@Component({
    selector: 'app-event-controls',
    templateUrl: './event-controls.component.html',
    // styleUrls: ['./event-controls.component.scss']
})
export class EventControlsComponent implements OnInit {

    @Input()
    public eventId: string;

    @Input()
    public canEdit: boolean;

    @Input()
    public canDelete: boolean;

    @Input()
    public isSubscribed: boolean;

    @Output()
    public goToEditEvent = new EventEmitter();

    @Output()
    public deleteEvent = new EventEmitter();

    @Output()
    public subscribeToEvent = new EventEmitter();

    @Output()
    public unsubscribeFromEvent = new EventEmitter();

    /**
     * The to manage event's subscriptions
     */
    public routeToSubscriptions: string;

    /**
     * The route to edit the event
     */
    public routeToEditEvent: string;

    ngOnInit(): void {
        this.routeToSubscriptions = routeBuilder.eventsSubscriptions(this.eventId);
        this.routeToEditEvent = routeBuilder.eventEdit(this.eventId);
    }

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
