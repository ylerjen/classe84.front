import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '@models/User';
import { Subscription } from '@models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import { GetUserStart } from 'app/actions/user.actions';
import { IUserState } from 'app/stores/user/user.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { GetAddressListAsync } from '@actions/addresslist.actions';
import { GetParticipationListStart } from '@actions/participations.actions';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    styleUrls: [ './user-page.component.scss' ]
})
export class UserPageComponent implements OnInit {

    private _id: string;
    public isLoading: boolean;
    public isEditMode: boolean;
    public user: User;
    public userParticipations: Array<Subscription> = [];

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this._store.select(store => store.userState)
            .subscribe(
                (resp: IUserState) => {
                    this.isLoading = resp.isLoading;
                    this.user = resp.user;
                },
                (error: any) => this._router.navigate(['unauthorized'])
            );
        this._store.select(store => store.participationsState)
            .subscribe(
                (subscrState: ISubscriptionState) => this.userParticipations = subscrState.subscriptionList,
                (err: Error) => console.error(err)
            );
    }

    ngOnInit(): void {
        this._route.params
            .subscribe( (routeData: Params) => {
                // TODO can use : this._route.snapshot instead ?
                this.isEditMode = window.location.pathname.indexOf('edit') > 0;
                this._id = routeData.id as string;
                this._store.dispatch(new GetUserStart(this._id));
                this._store.dispatch(new GetAddressListAsync(this._id));
                this._store.dispatch(new GetParticipationListStart(this._id));
            });
    }

    deleteRequest(userId: number): void {
        throw new Error('Not implemented yet');
    }
}
