import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from '@models/User';
import { Subscription as EventSubscription } from '@models/Subscription';
import { GlobalState } from 'app/stores/globalState';
import { GetUserStart } from 'app/actions/user.actions';
import { IUserState } from 'app/stores/user/user.reducer';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { GetAddressListAsync } from '@actions/addresslist.actions';
import { GetParticipationListStart } from '@actions/participations.actions';
import { selectUserState } from 'app/stores/user/selectors/user.selector';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    styleUrls: [ './user-page.component.scss' ]
})
export class UserPageComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    private _id: string;

    public isLoading: boolean;
    public isEditMode: boolean;
    public user: User;
    public userParticipations: Array<EventSubscription> = [];

    constructor(
        private _store: Store<GlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {}

    ngOnInit(): void {
        this.sub = this._store.select(s => selectUserState(s))
            .subscribe(
                (resp: IUserState) => {
                    this.isLoading = resp.isLoading;
                    this.user = resp.user;
                },
                (error: any) => this._router.navigate(['unauthorized'])
            );

        this.sub.add(this._store.select(store => store.participationsState)
            .subscribe(
                (subscrState: ISubscriptionState) => this.userParticipations = subscrState.subscriptionList,
                (err: Error) => console.error(err)
            )
        );

        this.sub.add(this._route.params
            .subscribe( (routeData: Params) => {
                // TODO can use : this._route.snapshot instead ?
                this.isEditMode = window.location.pathname.indexOf('edit') > 0;
                this._id = routeData.id as string;
                this._store.dispatch(new GetUserStart(this._id));
                this._store.dispatch(new GetAddressListAsync(this._id));
                this._store.dispatch(new GetParticipationListStart(this._id));
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    deleteRequest(userId: number): void {
        throw new Error('Not implemented yet');
    }
}
