import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import 'rxjs/add/operator/finally';

import { Subscription } from 'app/models/Subscription';
import { Event } from '../../../models/Event';
import { IGlobalState } from '../../../stores/globalState';
import { getEventAsyncFinished } from '../../../actions/event.actions';
import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

    public isLoading: boolean;

    public subscriberList: Array<Subscription>;

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
        private _evtSrvc: EventsService,
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this._route.params
            .switchMap( (routeData: Params): Observable<Action> => {
                const id = routeData.id;
                this._evtSrvc.getSubscribers(id)
                    .subscribe(
                        (subscrList: Array<Subscription>) => {
                            this.subscriberList = subscrList.map(subscr => new Subscription(subscr));
                        }
                    );
                return this.fetchEvent(id)
                    .map( (payload: Event): Action => getEventAsyncFinished(payload));
            })
            .subscribe(
                (resp: Action) => this._store.dispatch(resp),
                (error: any) => this._router.navigate(['unauthorized']),
                () => this.isLoading = false
            );
    }

    fetchEvent(id: number): Observable<Event> {
        return this._evtSrvc.get(id.toString());
    }

}
