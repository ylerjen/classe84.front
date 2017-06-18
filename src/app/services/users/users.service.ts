import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IAppState } from '../../stores/appState';
import { User } from '../../models/User';
import { Notification, ENotificationType } from '../../models/Notification';
import { IUserListState } from '../../stores/userlist/userlistReducer';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { GET_USER,
    ADD_USER,
    DELETE_USER,
    ASYNC_USER_START,
    ASYNC_USER_SUCCESS,
    ASYNC_USERLIST_START,
    ASYNC_USERLIST_SUCCESS,
    CHANGE_FILTER } from '../../actions/users.actions';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    constructor(
        private _http: Http,
        private _store: Store<IAppState>,
        private _authHttp: AuthHttp
    ) { }

    reload(): Observable<Action> {
        this._store.dispatch( { type: ASYNC_USERLIST_START});
        return this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: ASYNC_USERLIST_SUCCESS, payload }));
    }

    get(id: number): Observable<Action> {
        const endpoint = `${BASE_URL}/${id}`;
        console.log('get user', id);
        this._store.dispatch( { type: ASYNC_USER_START});
        return this._authHttp.get(endpoint)
            .map(res => res.json());
    }

    add(user: User) {
        console.log('add user from service');
    }

    delete(user: User) {
        console.log(DELETE_USER + ' from service');
        this._store.dispatch({ type: DELETE_USER, payload: user });
    }

    updateFilter(filter: string) {
        this._store.dispatch({ type: CHANGE_FILTER });
    }
}
