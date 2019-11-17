import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { User } from '@models/User';
import { Subscription as EventSubscription } from '@models/Subscription';
import { Event as EventModel } from '@models/Event';
import { GlobalState } from 'app/stores/globalState';
import { EventState } from 'app/event/state/reducers/event.reducer';
import { UserListState } from 'app/stores/userlist/userlist.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { GetEvent } from 'app/event/state/actions/event.actions';
import {
    AddSubscription,
    DeleteSubscription,
    GetSubscriptionStart
} from 'app/actions/subscription.actions';
import { GetUserListAsync } from '@actions/userlist.actions';

@Component({
    selector: 'app-event-subscriptions-viewer',
    templateUrl: './event-subscriptions-viewer.component.html',
    styleUrls: ['./event-subscriptions-viewer.component.scss']
})
export class EventSubscriptionsViewerComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    private subscribableUserList: Array<User>;

    public event: EventModel;

    public subscribersList: Array<EventSubscription>;

    public asyncSelected: string;

    public typeaheadLoading: boolean;

    public typeaheadNoResults: boolean;

    public searchableList;

    public isLoading: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<GlobalState>,
    ) {}

    ngOnInit(): void {
        this.sub = this._store.select(store => store.eventState)
            .subscribe((eventState: EventState) => {
                this.event = new EventModel(eventState.event);
                this.isLoading = eventState.isLoading;
            });
        this.sub.add(this._store.select(store => store.userlistState)
            .subscribe((userListState: UserListState) => {
                this.subscribableUserList = userListState.userList;
                this.refreshSearchableList();
            })
        );
        this.sub.add(this._store.select(store => store.subscriptionsState)
            .subscribe((subscrState: ISubscriptionState) => {
                this.subscribersList = subscrState.subscriptionList.map(
                    sub => new EventSubscription(sub)
                );
                this.refreshSearchableList();
            })
        );

        this.isLoading = false;
        this.sub.add(this._route.params
            .subscribe((routeData: Params) => {
                this._store.dispatch(new GetUserListAsync());
                const id = routeData.id;
                if (!id) {
                    throw new Error('id of the current route is not defined');
                }

                this._store.dispatch(new GetEvent(id));
                this._store.dispatch(new GetSubscriptionStart(id));
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Refresh the list of user who can be selected in the autocomplete field for subscription
     * according to the currently loaded user list and the already subscribed users
     */
    refreshSearchableList() {
        if (!Array.isArray(this.subscribableUserList) || !this.subscribableUserList.length) {
            this.searchableList = [];
        } else {
            this.searchableList = this.subscribableUserList
                .filter(
                    (user: User) => !this.subscribersList.find(subscr => subscr.user_id === user.id)
                )
                .map(
                    (user: User) => ({ title: user.fullname, originalObject: user })
                );
        }
    }

    onAddSubscription(selectedItem) {
        const user = selectedItem.originalObject as User;

        const subscr = new EventSubscription({
            user,
            user_id: user.id,
            event: this.event,
            event_id: this.event.id,
            isStorePending: true
        });

        this._store.dispatch(new AddSubscription(subscr));
    }

    onDeleteSubscription(subscr: EventSubscription) {
        this._store.dispatch(new DeleteSubscription(subscr));
    }
}
