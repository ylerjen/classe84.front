import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription as ObsSubscr, combineLatest } from 'rxjs';

import { User } from '@models/User';
import { Event } from '@models/Event';
import { GlobalState } from 'app/stores/globalState';
import { Subscription } from '@models/Subscription';
import { selectLoggedUser } from 'app/stores/session/session.selector';
import { selectSubscriptionState } from 'app/stores/subscription/subscription.selector';
import { isSubscribable } from 'app/event/services/subscription.service';
import { selectEventState } from 'app/event/states/selectors/event.selector';
import { PermissionService } from 'app/auth/services/permission.service';
import { DeleteEventFromList } from '@events/states/actions/eventlist.actions';
import { AddSubscription, DeleteSubscription } from '@actions/subscription.actions';

@Component({
    selector: 'app-event-detail-layout',
    templateUrl: './event-detail-layout.component.html',
    styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit, OnDestroy {
    private loggedUser: User;
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
            this.store$.select(selectSubscriptionState),
            this.store$.select(selectLoggedUser),
            this.store$.select(selectEventState),
        ).subscribe(([subscriptionState, sessionUser, eventState]) => {
            this.event = eventState.event;
            this.eventSubscriptions = subscriptionState.subscriptionList;
            this.isLoading = subscriptionState.isLoading;

            // FIXME remove the following god mode for all => !!sessionState.session.isAdmin;
            this.canDelete = true;
            this.canEdit = true;
            this.loggedUser = sessionUser;

            this.isSubscribed = subscriptionState.subscriptionList.some(u => u.user_id === sessionUser.id);
            this.isSubscribable = isSubscribable();
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    subscribe(eventId: string): void {
        const subscription = new Subscription({event_id: eventId, user: this.loggedUser});
        this.store$.dispatch(new AddSubscription(subscription));
    }

    unsubscribe(eventId: string): void {
        const subscription = new Subscription({event_id: eventId, user: this.loggedUser});
        this.store$.dispatch(new DeleteSubscription(subscription));
    }

    delete(eventId: string): void {
        this.store$.dispatch(new DeleteEventFromList(new Event({id: eventId})));
    }
}
