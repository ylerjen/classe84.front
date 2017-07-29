import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import 'rxjs/add/operator/switchMap';

import { ROUTE_URL } from '../../config/router.config';
import { User } from '../../models/User';
import { IGlobalState } from '../../stores/globalState';
import { IUserState } from '../../stores/user/userReducer';
import { ISessionState } from '../../stores/session/session.reducer';
import { ASYNC_USER_SUCCESS } from '../../actions/users.actions';
import { UsersService } from '../../services/users/users.service';
import { LoginService } from '../../services/login/login.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-page',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UserPage implements OnInit {

    public user: User;
    private _id: number;

    constructor(
        private _store: Store<IGlobalState>,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userSrv: UsersService,
        private _loginService: LoginService,
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
                        .map(payload => ({ type: ASYNC_USER_SUCCESS, payload }))
                        .subscribe(action => this._store.dispatch(action));
                // } else {
                //     console.log('NOT LOGGED IN => ADD REDIRECT');
                // }
            });
    }

    fetchUser(id: number): Observable<Action> {
        return this._userSrv.get(id);
    }

    deleteRequest(userId: number): void {
        throw new Error('Not implemented yet');
    }

}
