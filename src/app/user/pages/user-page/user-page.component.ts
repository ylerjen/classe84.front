import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from 'app/models/User';
import { Subscription } from 'app/models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import { getUserAsyncStart } from 'app/actions/user.actions';
import { UsersService } from '../../services/users.service';
import { IUserState } from 'app/stores/user/user.reducer';
import { getSubscriptionAsyncStart } from 'app/actions/subscription.actions';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    styleUrls: [ './user-page.component.scss' ]
})
export class UserPageComponent implements OnInit {

    private _id: number;
    public isLoading: boolean;
    public isEditMode: boolean;
    public user: User;
    public eventsSubscriptions: Array<Subscription> = [];

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userSrv: UsersService,
    ) { }

    ngOnInit(): void {
        this._store.select('userState')
            .subscribe(
                (resp: IUserState) => {
                    this.isLoading = resp.isLoading;
                    this.user = resp.user;
                },
                (error: any) => this._router.navigate(['unauthorized'])
            );
        this._store.select('subscriptionsState')
            .subscribe(
                (subscrState: ISubscriptionState) => this.eventsSubscriptions = subscrState.subscriptionList,
                (err: Error) => console.error(err)
            );
        this._route.params
            .subscribe( (routeData: Params) => {
                this.isEditMode = window.location.pathname.indexOf('edit') > 0;
                this._id = routeData.id;
                this._store.dispatch(getUserAsyncStart(this._id));
                this._store.dispatch(getSubscriptionAsyncStart(this._id));
            });

    }

    deleteRequest(userId: number): void {
        throw new Error('Not implemented yet');
    }

}
