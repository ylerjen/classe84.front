import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompleterItem } from 'ng2-completer';
import { Store } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import { Event as EventModel } from 'app/models/Event';
import { IEventState } from 'app/stores/event/event.reducer';
import { IUserListState } from 'app/stores/userlist/userlist.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { EventsService } from '../../services/events.service';
import { User } from 'app/models/User';
import { UsersService } from 'app/user/services/users.service';
import { addSubscription, updateSubscription, deleteSubscription } from 'app/actions/subscription.actions';
import { IGlobalState } from 'app/stores/globalState';

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
        private _evtSrvc: EventsService,
        private _userSrvc: UsersService
    ) {
        this._store.select('eventState')
            .subscribe((eventState: IEventState) => {
                this.event = new EventModel(eventState.event);
            });
        this._store.select('userlistState')
            .subscribe((userListState: IUserListState) => {
                this.subscribableUserList = userListState.userList;
                this.refreshSearchableList();
            });
        this._store.select('subscriptionsState')
            .subscribe((subscrState: ISubscriptionState) => {
                    this.subscribersList = subscrState.subscriptionList.map(
                        sub => new Subscription(sub)
                    );
                    this.isLoading = false;
                    this.refreshSearchableList();
                }
            );
    }

    ngOnInit() {
        this.isLoading = true;
        const routePath = window.location.pathname.replace('/events/', ''); // TODO find a better to get the route id from Angular Router
        const curId = routePath.substring(0, routePath.indexOf('/'));
        this._evtSrvc.get(curId)
            .subscribe( (event: EventModel) => {
                this.event = event;
                this._evtSrvc.getSubscribers(this.event.id.toString())
                    .subscribe(
                        (subscriptionList: Array<Subscription>) => {
                            this.subscribersList = subscriptionList.map(
                                sub => new Subscription(sub)
                            );
                            this.isLoading = false;
                            this.refreshSearchableList();
                        }
                    );
                });
        this._userSrvc.fetchAll().subscribe();
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
        // already dispatch the add with optimistic mgmt
        this._store.dispatch(addSubscription(subscr));
        this._evtSrvc.susbcribeToEvent(subscr)
            .subscribe(
                (respBody) => {
                    subscr.isStorePending = false;
                    this._store.dispatch(updateSubscription(subscr));
                },
                (err) => {
                    this._store.dispatch(deleteSubscription(subscr));
                    alert('subscr was removed');
                }
            );
    }

    onDeleteSubscription(subscr: Subscription) {
        // already dispatch the delete with optimistic mgmt
        this._store.dispatch(deleteSubscription(subscr));
        this._evtSrvc.unsubscribeFromEvent(subscr)
            .subscribe(
                (respBody) => {
                    alert('deleted');
                },
                (err) => {
                    this._store.dispatch(addSubscription(subscr));
                    alert('subscr was removed');
                }
            );
    }

}
