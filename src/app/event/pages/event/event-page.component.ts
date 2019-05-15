import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { getEventStart } from 'app/actions/event.actions';
import { getSubscriptionStart, FetchSubscriptionCmd, SubscriptionType } from 'app/actions/subscription.actions';
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
    ) {
        this._store.select(store => store.subscriptionsState)
            .subscribe(
                (subscrState: ISubscriptionState) => this.subscriberList = subscrState.subscriptionList
            );
    }

    ngOnInit() {
        this.isLoading = true;
        this._route.params
            .subscribe( (routeData: Params) => {
                const id = routeData.id;
                const subscrRqstCmd: FetchSubscriptionCmd = {
                    id,
                    type: SubscriptionType.Event
                };
                this._store.dispatch(getEventStart(id));
                this._store.dispatch(getSubscriptionStart(subscrRqstCmd));
            });
    }
}
