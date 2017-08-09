import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { Event } from '../../../models/Event';
import { User } from '../../../models/User';
import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

    private _id: number;
    public event: Event;
    public isLoading: boolean;

    public participation: Array<User>;

    constructor(
        private _route: ActivatedRoute,
        private _evtSrvc: EventsService,
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this._route.params
            .switchMap( (routeData: Params): Observable<Event> => {
                this._id = routeData.id;
                this._evtSrvc.getParticipants(this._id)
                    .subscribe( (resp: Array<User>) => {
                        this.participation = resp.map(usr => new User(usr));
                    });
                return this._evtSrvc.get(this._id);
            })
            .subscribe(
                (resp: Event) => {
                    if (resp) {
                        this.event = resp;
                    }
                    this.isLoading = false;
                },
                (err: any) => {
                    if (err) {
                        if (err.status === 401) {
                           // JWT expired, go to login
                           // Observable.throw(err);
                        }
                        if (err.status === 403) {
                           // no sufficient permission, go to unauthorized
                           // Observable.throw(err);
                        }
                    }
                },
                () => this.isLoading = false
            );
    }

}
