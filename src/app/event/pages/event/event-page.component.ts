import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { getEventStart } from 'app/actions/event.actions';
import { getSubscriptionStart } from 'app/actions/subscription.actions';

@Component({
    selector: 'app-event-page',
    templateUrl: './event-page.component.html',
    styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

    public subscriberList: Array<Subscription>;

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
    ) {
        this._store.select(store => store.subscriptionsState)
            .subscribe(
                (subscrState: ISubscriptionState) => this.subscriberList = subscrState.subscriptionList
            );
    }

    ngOnInit() {
        this._route.params
            .subscribe( (routeData: Params) => {
                const id = routeData.id;
                this._store.dispatch(getEventStart(id));
                this._store.dispatch(getSubscriptionStart(id));
            });
    }
}
