import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import { User } from 'app/models/User';
import { Event } from 'app/models/Event';
import { IGlobalState } from 'app/stores/globalState';
import { getUserAsyncFinished } from 'app/actions/user.actions';
import { UsersService } from 'app/services/users/users.service';

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
    public eventsSubscriptions: Array<Event> = [];

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userSrv: UsersService,
    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this._route.params
            .switchMap( (routeData: Params): Observable<Action> => {
                this.isEditMode = window.location.pathname.indexOf('edit') > 0;
                this._id = routeData.id;
                return this.fetchUser(this._id)
                    .map( (payload: User): Action => {
                        this.user = payload;
                        return getUserAsyncFinished(payload);
                    });
            })
            .subscribe(
                (resp: Action) => {
                    this._store.dispatch(resp);
                    this.fetchUserSubscriptions(this._id).subscribe(
                        (eventList: Array<Event>) => this.eventsSubscriptions = eventList
                    );
                },
                (error: any) => this._router.navigate(['unauthorized']),
                () => this.isLoading = false
            );

    }

    fetchUser(id: number): Observable<User> {
        return this._userSrv.get(id);
    }

    fetchUserSubscriptions(id: number): Observable<Array<Event>> {
        return this._userSrv.getSubscriptions(this._id);
    }

    deleteRequest(userId: number): void {
        throw new Error('Not implemented yet');
    }

}
