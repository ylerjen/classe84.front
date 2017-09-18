import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';

import { ROUTE_URL } from '../../../config/router.config';
import { User } from '../../../models/User';
import { Event } from '../../../models/Event';
import { IGlobalState } from '../../../stores/globalState';
import { IUserState } from '../../../stores/user/userReducer';
import { ISessionState } from '../../../stores/session/session.reducer';
import { ASYNC_USER_SUCCESS } from '../../../actions/users.actions';
import { UsersService } from '../../../services/users/users.service';

@Component({
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    styleUrls: [ './user-page.component.scss' ]
})
export class UserPageComponent implements OnInit {

    public user: User;
    private _id: number;
    public eventsSubscriptions: Array<Event> = [];

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userSrv: UsersService,
    ) {
        this._store.select('userState')
            .subscribe( (userState: IUserState) => {
                this.user = userState.user;
                console.log(this.user);
            });
    }

    ngOnInit(): void {
        this._route.params
            .switchMap( (routeData: Params): Observable<ISessionState> => {
                this._id = routeData.id;
                return this._store.select('sessionState');
            })
            .subscribe( (sessionState: ISessionState) => {
                // if (sessionState.isLoggedIn) {
                    this.fetchUser(this._id)
                        .map( (payload: User): Action => ({ type: ASYNC_USER_SUCCESS, payload }))
                        .subscribe(
                            (action: Action) => this._store.dispatch(action),
                            (error: any) => this._router.navigate(['unauthorized'])
                        );

                        this.fetchUserSubscriptions(this._id).subscribe(
                            (eventList: Array<Event>) => this.eventsSubscriptions = eventList
                        );
                // } else {
                //     console.log('NOT LOGGED IN => ADD REDIRECT');
                // }
            });

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