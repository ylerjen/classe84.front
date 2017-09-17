import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-eventlist-page',
    templateUrl: './eventlist-page.component.html',
    styleUrls: ['./eventlist-page.component.scss']
})
export class EventlistPageComponent implements OnInit {

    public isLoading: boolean;

    public eventList = [];

    constructor(private _evtSrvc: EventsService) { }

    ngOnInit() {
        this.isLoading = true;
        this._evtSrvc.fetchAll()
            .finally( () => this.isLoading = false )
            .subscribe(
                (resp) => this.eventList = resp,
                (err) => { throw new Error(JSON.stringify(err)); },
            );
    }

}
