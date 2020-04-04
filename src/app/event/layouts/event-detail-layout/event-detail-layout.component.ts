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
import { DeleteEventFromList } from '@events/states/actions/eventlist.actions';
import { AddSubscription, DeleteSubscription } from '@actions/subscription.actions';
import { routeBuilder } from 'app/config/router.config';

@Component({
    selector: 'app-event-detail-layout',
    templateUrl: './event-detail-layout.component.html',
    styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit, OnDestroy {
    /**
     * The subscriptions to observable
     */
    private subscriptions: ObsSubscr;
    /**
     * The currently logged user
     */
    private loggedUser: User;
    /**
     * The url to go back to the list of events
     */
    public backUrl: string;
    /**
     * The current event object
     */
    public event: Event;
    /**
     * The subscriptions related to the current event
     */
    public eventSubscriptions: Array<Subscription>;
    /**
     * An info to know if the current user can delete the event
     */
    public canDelete: boolean;
    /**
     * An info to know if the current user can edit the event
     */
    public canEdit: boolean;
    /**
     * Inform if the component's data is loading
     */
    public isLoading = true;
    /**
     * The current event id
     */
    public eventId: string;
    /**
     * If the current user is subscribed to the event of not
     */
    public isSubscribed: boolean;

    constructor(
        private _route: ActivatedRoute,
        private store$: Store<GlobalState>,
    ) {}

    ngOnInit() {
        this.backUrl = routeBuilder.eventlist();
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
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
     * Subscribe the currently logged user to the event
     * @param eventId - the id of the event
     */
    subscribe(eventId: string): void {
        const subscription = new Subscription({event_id: eventId, user: this.loggedUser});
        this.store$.dispatch(new AddSubscription(subscription));
    }

    /**
     * Unsubscribe the currently logged user to the event
     * @param eventId - the id of the event
     */
    unsubscribe(eventId: string): void {
        const subscription = new Subscription({event_id: eventId, user: this.loggedUser});
        this.store$.dispatch(new DeleteSubscription(subscription));
    }
    /**
     * Delete the event
     * @param eventId - the id of the event to delete
     */
    delete(eventId: string): void {
        this.store$.dispatch(new DeleteEventFromList(new Event({id: eventId})));
    }
}
