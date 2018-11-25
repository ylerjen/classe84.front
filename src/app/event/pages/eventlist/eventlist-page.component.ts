import { Component, OnInit } from '@angular/core';

import { Event } from '@models/Event';
import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-eventlist-page',
    templateUrl: './eventlist-page.component.html',
    styleUrls: ['./eventlist-page.component.scss']
})
export class EventlistPageComponent implements OnInit {

    public nextEvent: Event;

    constructor(
        private _evtSrvc: EventsService,
    ) { }

    ngOnInit() {
        this._evtSrvc.getNextEvent().subscribe(
            (evt: Event) => {
                this.nextEvent = evt;
            }
        );
    }

}
