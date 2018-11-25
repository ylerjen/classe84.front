import { Component, Input } from '@angular/core';

import { Event as Evt } from 'app/models/Event';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

    @Input()
    isLoading: boolean;

    private _eventList: Array<Evt> = [];

    @Input()
    set eventList(list: Array<Evt>) {
        if (Array.isArray(list)) {
            this._eventList = list.sort( (evt1: Evt, evt2: Evt): number => {
                if (evt1.start_date === evt2.start_date) {
                    return 0;
                } else if (evt1.start_date > evt2.start_date) {
                    return -1;
                } else {
                    return 1;
                }
            });
        }
    }
    get eventList(): Array<Evt> {
        return this._eventList;
    }
}
