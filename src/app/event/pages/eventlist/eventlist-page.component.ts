import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IEventListState } from '../../../stores/eventlist/eventlistReducer';
import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-eventlist-page',
    templateUrl: './eventlist-page.component.html',
    styleUrls: ['./eventlist-page.component.scss']
})
export class EventlistPageComponent implements OnInit {

    constructor(
        private _evtSrvc: EventsService,
        private _store: Store<IEventListState>,
    ) { }

    ngOnInit() {
    }

}
