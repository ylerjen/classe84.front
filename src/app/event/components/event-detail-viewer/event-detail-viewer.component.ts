import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable ,  Subscription as RxjsSubscriptions } from 'rxjs';

import { ROUTE_URL } from 'app/config/router.config';
import { Session } from '@models/Session';
import { Event } from '@models/Event';
import { Subscription as EventSubscription, Subscription } from '@models/Subscription';
import { GlobalState } from 'app/stores/globalState';
import { EventState } from 'app/stores/event/event.reducer';
import { SessionState } from 'app/stores/session/session.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { AddSubscription, DeleteSubscription } from '@actions/subscription.actions';

@Component({
    selector: 'app-event-detail-viewer',
    templateUrl: './event-detail-viewer.component.html',
    styleUrls: ['./event-detail-viewer.component.scss']
})
export class EventDetailViewerComponent implements OnInit, OnDestroy {

    private subscrList: Array<EventSubscription> = [];
    private session: Session;
    private rxjsSubscriptions: RxjsSubscriptions;
    private eventState$: Observable<EventState>;
    private sessionState$: Observable<SessionState>;
    private evtSubscrState$: Observable<ISubscriptionState>;

    public event: Event;

    public isLoading: boolean;

    public isSubscribed = false;

    public isSubscribable = false;

    public isAdmin = true;

    constructor(
        private _store: Store<GlobalState>,
        private _router: Router,
    ) {
        this.eventState$ = this._store.select(store => store.eventState);
        this.sessionState$ = this._store.select(store => store.sessionState);
        this.evtSubscrState$ = this._store.select(store => store.subscriptionsState);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.rxjsSubscriptions = this.eventState$.subscribe(
            (eventState: EventState) => this.onEventStateChanged(eventState),
            (err) => console.error(err)
        );
        this.rxjsSubscriptions.add(
            this.evtSubscrState$.subscribe(
                state => {
                    this.subscrList = state.subscriptionList;
                    this.defineSubscriptionState();
                }
            )
        );
        this.rxjsSubscriptions.add(
            this.sessionState$.subscribe(
                state => {
                    if (state.session.user) {
                        this.session = state.session;
                    }
                    this.defineSubscriptionState();
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.rxjsSubscriptions.unsubscribe();
    }

    defineSubscriptionState() {
        if (!this.session || !this.session.user.id || !Array.isArray(this.subscrList)) {
            this.isSubscribable = false;
        } else {
            this.isSubscribable = true;
            this.isSubscribed = this.subscrList.some(subsc => subsc.user_id === this.session.user.id);
        }
    }

    onEventStateChanged(state: EventState) {
        if (state.event) {
            this.event = new Event(state.event);
            this.isLoading = state.isLoading;
        }
    }
}
