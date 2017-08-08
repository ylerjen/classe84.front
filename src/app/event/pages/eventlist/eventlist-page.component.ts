import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-eventlist-page',
    templateUrl: './eventlist-page.component.html',
    styleUrls: ['./eventlist-page.component.scss']
})
export class EventlistPageComponent implements OnInit {

    public eventList = [];

    constructor(private _evtSrvc: EventsService) { }

    ngOnInit() {
        this._evtSrvc.fetchAll()
            .subscribe(
                (resp) => this.eventList = resp
            );
    }

}
