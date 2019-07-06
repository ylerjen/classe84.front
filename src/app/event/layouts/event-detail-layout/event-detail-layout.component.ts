import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription as ObsSubscr } from 'rxjs';

import { GlobalState } from 'app/stores/globalState';
import { EventState } from 'app/stores/event/event.reducer';
import { Subscription } from '@models/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Session } from '@models/Session';

@Component({
    selector: 'app-event-detail-layout',
    templateUrl: './event-detail-layout.component.html',
    styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit, OnDestroy {

    public subscriptions: ObsSubscr;
    public eventSubscriptions: Array<Subscription>;
    public isAdmin: boolean;
    public isLoading = true;
    public eventId: string;

    constructor(
        private _route: ActivatedRoute,
        private store$: Store<GlobalState>,
    ) {}

    ngOnInit() {
        this.eventId = this._route.snapshot.data.currentEvent.id;
        this.subscriptions = this.store$.select(s => s.subscriptionsState)
            .subscribe({
                next: s => {
                    this.eventSubscriptions = s.subscriptionList;
                    this.isLoading = s.isLoading;
                }
            });

        this.subscriptions.add(this.store$.select(s => s.sessionState)
            .subscribe({
                next: s => this.isAdmin = s.session.isAdmin,
            }))
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
