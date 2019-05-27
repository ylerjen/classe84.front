import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription as RxjsSubscriptions } from 'rxjs/Subscription';

import { ROUTE_URL } from 'app/config/router.config';
import { Session } from 'app/models/Session';
import { Event } from 'app/models/Event';
import { Subscription as EventSubscription, Subscription } from 'app/models/Subscription';
import { AddSubscription, DeleteSubscription } from 'app/actions/subscription.actions';
import { IGlobalState } from 'app/stores/globalState';
import { IEventState } from 'app/stores/event/event.reducer';
import { ISessionState } from 'app/stores/session/session.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { EventsService } from 'app/event/services/events.service';

@Component({
    selector: 'app-event-detail-viewer',
    templateUrl: './event-detail-viewer.component.html',
    styleUrls: ['./event-detail-viewer.component.scss']
})
export class EventDetailViewerComponent implements OnInit, OnDestroy {

    private subscrList: Array<EventSubscription> = [];
    private session: Session;
    private rxjsSubscriptions: RxjsSubscriptions;
    private eventState$: Observable<IEventState>;
    private sessionState$: Observable<ISessionState>;
    private evtSubscrState$: Observable<ISubscriptionState>;

    public event: Event;

    public isLoading: boolean;

    public isSubscribed = false;

    public isSubscribable = false;

    public isAdmin = true;

    constructor(
        private _store: Store<IGlobalState>,
        private _router: Router,
        private _eventSrvc: EventsService,
    ) {
        this.eventState$ = this._store.select(store => store.eventState);
        this.sessionState$ = this._store.select(store => store.sessionState);
        this.evtSubscrState$ = this._store.select(store => store.subscriptionsState);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.rxjsSubscriptions = this.eventState$.subscribe(
            (eventState: IEventState) => this.onEventStateChanged(eventState),
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
                    if (state.isLoggedIn && state.session.user) {
                        this.session = state.session;
                    }
                    this.defineSubscriptionState();
                }
            )
        );
    }

    defineSubscriptionState() {
        if (!this.session || !this.session.user.id || !Array.isArray(this.subscrList)) {
            this.isSubscribable = false;
        } else {
            this.isSubscribable = true;
            this.isSubscribed = this.subscrList.some(subsc => subsc.user_id === this.session.user.id);
        }
    }

    onEventStateChanged(state: IEventState) {
        if (state.event) {
            this.event = new Event(state.event);
            this.isLoading = state.isLoading;
        }
    }

    ngOnDestroy(): void {
        this.rxjsSubscriptions.unsubscribe();
    }

    goToEdit(): void {
        if (!this.event) {
            throw new Error('no valid Event is referenced');
        }
        const id = this.event.id;
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.events}/${id.toString()}/edit`;
        this._router.navigate([url]);
    }

    delete(): void {
        if (!this.event) {
            throw new Error('no valid Event is referenced');
        }
        const id = this.event.id;
        console.log('delete', id);
        throw new Error('not implemented yet');
    }

    subscribe(): void {
        if (!this.event) {
            throw new Error('no valid Event is referenced');
        }
        if (!this.session || !this.session.user || !this.session.user.id) {
            throw new Error('no valid session user id referenced');
        }
        const subscr = new Subscription({
            user: this.session.user,
            event: this.event,
        });
        this._store.dispatch(new AddSubscription(subscr));
    }

    unsubscribe(): void {
        if (!this.event) {
            throw new Error('no valid Event is referenced');
        }
        if (!this.session || !this.session.user || !this.session.user.id) {
            throw new Error('no valid session user id referenced');
        }
        const subscr = new Subscription({
            user: this.session.user,
            event: this.event,
        });
        this._store.dispatch(new DeleteSubscription(subscr));
    }
}
