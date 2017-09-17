import { Component, Input } from '@angular/core';

import { Event } from '../../models/Event';

@Component({
    selector: 'app-event-list-wrapper',
    templateUrl: './event-list-wrapper.component.html',
    styleUrls: ['./event-list-wrapper.component.scss']
})
export class EventListWrapperComponent {

    public filter =  {};

    private _eventList: Array<Event> = [];
    @Input()
    set eventList(val: Array<Event>) {
        if (Array.isArray(val)) {
            this._eventList = val;
        } else {
            this._eventList = [];
        }
        this.filteredList = this._eventList; // remove once filter is ready
    }

    public filteredList: Array<Event>;


    onFilterChange(evt) {
        console.log('onFilterChange', evt);
        throw new Error('Not implemented yet');
    }
}
