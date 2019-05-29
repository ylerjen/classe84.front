import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompleterItem } from 'ng2-completer';
import { Store } from '@ngrx/store';

import { User } from '@models/User';
import { Subscription } from '@models/Subscription';
import { Event as EventModel } from '@models/Event';
import { IGlobalState } from 'app/stores/globalState';
import { IEventState } from 'app/stores/event/event.reducer';
import { IUserListState } from 'app/stores/userlist/userlist.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { GetEventStart } from '@actions/event.actions';
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
export class EventSubscriptionsViewerComponent implements OnInit {

    public event: EventModel;

    public subscribersList: Array<Subscription>;
    private subscribableUserList: Array<User>;

    public searchableList: Array<CompleterItem>;

    public isLoading: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<IGlobalState>,
    ) {
        this._store.select(store => store.eventState)
            .subscribe((eventState: IEventState) => {
                this.event = new EventModel(eventState.event);
            });
        this._store.select(store => store.userlistState)
            .subscribe((userListState: IUserListState) => {
                this.subscribableUserList = userListState.userList;
                this.refreshSearchableList();
            });
        this._store.select(store => store.subscriptionsState)
            .subscribe((subscrState: ISubscriptionState) => {
                    this.subscribersList = subscrState.subscriptionList.map(
                        sub => new Subscription(sub)
                    );
                    this.refreshSearchableList();
                }
            );
    }

    ngOnInit() {
        this.isLoading = false;
        this._route.params
            .subscribe( (routeData: Params) => {
                this._store.dispatch(new GetUserListAsync());
                const id = routeData.id;
                if (!id) {
                    throw new Error('id of the current route is not defined');
                }

                this._store.dispatch(new GetEventStart(id));
                this._store.dispatch(new GetSubscriptionStart(id));
            });
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
                    (user: User) => !this.subscribersList.find( subscr => subscr.user_id === user.id )
                )
                .map(
                    (user: User): CompleterItem => ({ title: user.fullname, originalObject: user })
                );
        }
    }

    onAddSubscription(selectedItem: CompleterItem) {
        const user = selectedItem.originalObject as User;

        const subscr = new Subscription({
            user,
            user_id: user.id,
            event: this.event,
            event_id: this.event.id,
            isStorePending: true
        });

        this._store.dispatch(new AddSubscription(subscr));
    }

    onDeleteSubscription(subscr: Subscription) {
        this._store.dispatch(new DeleteSubscription(subscr));
    }
}
