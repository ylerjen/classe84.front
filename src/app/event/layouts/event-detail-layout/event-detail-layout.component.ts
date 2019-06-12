import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGlobalState } from 'app/stores/globalState';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { IEventState } from 'app/stores/event/event.reducer';
import { Subscription } from '@models/Subscription';

@Component({
    selector: 'app-event-detail-layout',
    templateUrl: './event-detail-layout.component.html',
    styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit {

    public event$: Observable<IEventState>;
    public eventSubscr$: Observable<ISubscriptionState>;
    public eventSubscriptions: Array<Subscription>

    constructor(
        private store: Store<IGlobalState>,
    ) {}

    ngOnInit() {
        this.event$ = this.store.select(s => s.eventState);
        this.eventSubscr$ = this.store.select(s => s.subscriptionsState);

        this.eventSubscr$.subscribe({
            next: s => this.eventSubscriptions = s.subscriptionList,
        });
    }

}
