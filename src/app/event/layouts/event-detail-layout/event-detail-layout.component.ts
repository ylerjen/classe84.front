import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription as ObsSubscr, Observable, combineLatest } from 'rxjs';

import { GlobalState } from 'app/stores/globalState';
import { User } from '@models/User';
import { Subscription } from '@models/Subscription';
import { Event as EventModel } from '@models/Event';
import { DeleteEventFromList } from '@actions/eventlist.actions';
import { DeleteSubscription, AddSubscription } from '@actions/subscription.actions';
import { selectSubscription } from 'app/stores/subscription/subscription.selector';
import { selectLoggedUser, SessionFeatureState } from 'app/auth/state/selectors/session.selector';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { eventRouteBuilder } from 'app/event/event-route-builder';

@Component({
    selector: 'app-event-detail-layout',
    templateUrl: './event-detail-layout.component.html',
    styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit, OnDestroy {

    private user: User;
    public subscriptions: ObsSubscr;
    public eventSubscr$: Observable<ISubscriptionState>;
    public loggedUser$: Observable<User>;
    public eventSubscriptions: Array<Subscription>;
    public isLoading = true;
    public event: EventModel;
    public formUrl: string;
    public isSubscribable = true;
    public isSubscribed: boolean;
    public permissions: Array<string> = [];
    public editEventUrl: string;

    constructor(
        private route: ActivatedRoute,
        private store$: Store<GlobalState | SessionFeatureState>,
    ) {}

    ngOnInit() {
        this.event = this.route.snapshot.data.currentEvent;
        this.loggedUser$ = this.store$.select((s: SessionFeatureState) => selectLoggedUser(s));
        this.eventSubscr$ = this.store$.select((s: GlobalState) => selectSubscription(s));

        this.editEventUrl = eventRouteBuilder.edit(this.event.id);

        combineLatest(this.eventSubscr$, this.loggedUser$, (subscState, user) => {
            this.user = user;
            this.eventSubscriptions = subscState.subscriptionList;
            const userSub = this.eventSubscriptions.find(subscr => subscr.user.id === user.id);
            this.isSubscribed = !!userSub;
            this.isLoading = subscState.isLoading;
          }).subscribe();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    delete(): void {
        this.store$.dispatch(new DeleteEventFromList(this.event));
    }

    /**
     * Subscribe current user to the event
     */
    subscribe(): void {
        const subscription = new Subscription({
            event,
            user: this.user,
        });
        this.store$.dispatch(new AddSubscription(subscription));
    }

    /**
     * Unsubscribe current user to the event
     */
    unsubscribe(): void {
        const id = this.event.id;
        const subscription = new Subscription({
            event,
            user: this.user,
        });
        this.store$.dispatch(new DeleteSubscription(subscription));
    }

    deleteEvent(): void {
        if (!this.event) {
            throw new Error('no valid Event is referenced');
        }
        const id = this.event.id;
        console.log('delete', id);
        throw new Error('not implemented yet');
    }
}
