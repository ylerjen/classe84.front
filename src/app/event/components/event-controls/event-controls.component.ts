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
    public isAdmin: boolean;

    @Input()
    public isSubscribed: boolean;

    @Input()
    public isSubscribable: boolean;

    @Output()
    public subscribeToEvent = new EventEmitter();

    @Output()
    public unsubscribeFromEvent = new EventEmitter();

    subscribe(evt: Event): void {
        evt.preventDefault();
        console.log('subscribe');
        this.subscribeToEvent.emit();
    }

    unsubscribe(evt: Event): void {
        evt.preventDefault();
        console.log('unsubscribe');
        this.unsubscribeFromEvent.emit();
    }
}
