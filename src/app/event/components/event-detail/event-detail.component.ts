import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Event } from 'app/models/Event';
const GMAP_API_KEY = 'AIzaSyCu11GszVP-AIulkdvf3u403NKP_derMdA';

const staticMapRootUrl = new URL('https://maps.googleapis.com/maps/api/staticmap');

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {

    private _event: Event;
    @Input()
    public set event(evt: Event) {
        this._event = evt;
        if (evt) {
            this.staticMapSrc = this.staticMapUrlBuilder(evt);
        }
    }
    public get event(): Event {
        return this._event;
    }

    public staticMapSrc: string;

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

    staticMapUrlBuilder(event: Event): string {
        const url = staticMapRootUrl;
        const center = `${event.latitude},${event.longitude}`;
        url.searchParams.set('center', center);
        url.searchParams.set('zoom', '12');
        url.searchParams.set('size', '400x400');
        url.searchParams.set('key', GMAP_API_KEY);
        const workingUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=' + GMAP_API_KEY;
        console.log(workingUrl);
        console.log(url.toString());
        return url.toString();
    }
}
