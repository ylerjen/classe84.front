import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription as ObsSubscr, combineLatest } from 'rxjs';

import { Event } from '@models/Event';
import { GlobalState } from 'app/stores/globalState';
import { Subscription } from '@models/Subscription';
import { selectSessionState } from 'app/stores/session/session.selector';
import { selectSubscriptionState } from 'app/stores/subscription/subscription.selector';
import { isSubscribable } from 'app/event/services/subscription.service';
import { selectEventState } from 'app/event/states/selectors/event.selector';
import { PermissionService } from 'app/auth/services/permission.service';

@Component({
    selector: 'app-event-detail-layout',
    templateUrl: './event-detail-layout.component.html',
    styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit, OnDestroy {
    public event: Event;
    public subscriptions: ObsSubscr;
    public eventSubscriptions: Array<Subscription>;
    public canDelete: boolean;
    public canEdit: boolean;
    public isLoading = true;
    public eventId: string;
    public isSubscribed: boolean;
    public isSubscribable: boolean;

    constructor(
        private _route: ActivatedRoute,
        private store$: Store<GlobalState>,
        private permissionService: PermissionService,
    ) {}

    ngOnInit() {
        this.eventId = this._route.snapshot.data.currentEvent.id;
        this.subscriptions = combineLatest(
            this.store$.select(s => selectSubscriptionState(s)),
            this.store$.select(s => selectSessionState(s)),
            this.store$.select(s => selectEventState(s)),
        ).subscribe(([subscriptionState, sessionState, eventState]) => {
            this.event = eventState.event;
            this.eventSubscriptions = subscriptionState.subscriptionList;
            this.isLoading = subscriptionState.isLoading;

            // FIXME remove the following god mode for all => !!sessionState.session.isAdmin;
            this.canDelete = true;
            this.canEdit = true;

            this.isSubscribed = subscriptionState.subscriptionList.some(u => u.user_id === sessionState.session.user.id);
            this.isSubscribable = isSubscribable();
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
