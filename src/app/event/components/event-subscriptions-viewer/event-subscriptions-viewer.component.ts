import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompleterItem } from 'ng2-completer';
import { Store } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import { Event as EventModel } from 'app/models/Event';
import { IEventState } from 'app/stores/event/event.reducer';
import { EventsService } from '../../services/events.service';
import { IUserListState } from 'app/stores/userlist/userlist.reducer';
import { User } from 'app/models/User';
import { UsersService } from 'app/services/users/users.service';

@Component({
    selector: 'app-event-subscriptions-viewer',
    templateUrl: './event-subscriptions-viewer.component.html',
    styleUrls: ['./event-subscriptions-viewer.component.scss']
})
export class EventSubscriptionsViewerComponent implements OnInit {

    public event: EventModel;

    public subscribersList: Array<Subscription>;

    public searchableList: Array<CompleterItem>;

    protected isLoading: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _store: Store<IEventState>,
        private _evtSrvc: EventsService,
        private _userSrvc: UsersService
    ) {
        this._store.select('eventState')
            .subscribe((eventState: IEventState) => {
                this.event = new EventModel(eventState.event);
            });
        this._store.select('userlistState')
            .subscribe((userListState: IUserListState) => {
                this.searchableList = userListState.userList.map(
                    (user: User): CompleterItem => ({ title: user.fullname, originalObject: user })
                );
            });
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
                        }
                    );
                });
        this._userSrvc.fetchAll().subscribe();
    }

    onAddSubscription(selectedItem: CompleterItem) {
        const user = selectedItem.originalObject as User;
        this._evtSrvc.susbcribeToEvent(this.event.id.toString(), user.id.toString())
            .subscribe(
                () => alert('added')
            );
    }

    onDeleteSubscription(userId: number) {
        this._evtSrvc.unsubscribeFromEvent(this.event.id.toString(), userId.toString())
            .subscribe(
                () => alert('deleted')
            );
    }

}
