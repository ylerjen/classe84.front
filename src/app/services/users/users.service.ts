import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IGlobalState } from '../../stores/globalState';
import { User } from '../../models/User';
import { Notification, ENotificationType } from '../../models/Notification';
import { IUserListState } from '../../stores/userlist/userlistReducer';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { GET_USER,
    addUser,
    updateUser,
    deleteUser,
    changeFilter,
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
        private _store: Store<IGlobalState>,
        private _authHttp: AuthHttp
    ) { }

    reload(): Observable<Action> {
        this._store.dispatch( { type: ASYNC_USERLIST_START});
        return this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: ASYNC_USERLIST_SUCCESS, payload }));
    }

    get(id: number): Observable<Response> {
        const endpoint = `${BASE_URL}/${id}`;
        this._store.dispatch( { type: ASYNC_USER_START});
        return this._authHttp.get(endpoint)
            .map(res => res.json());
    }

    create(user: User): Observable<Response> {
        console.log('add user from service');
        this._store.dispatch(addUser(user));
        return this._authHttp.post(BASE_URL, user)
            .map(res => res.json());
    }

    update(user: User): Observable<Response> {
        const endpoint = `${BASE_URL}/${user.id}`;
        this._store.dispatch(updateUser(user));
        console.log('add user from service');
        return this._authHttp.put(endpoint, user)
            .map(res => res.json());
    }

    save(user: User): Observable<Response>  {
        if (user.id) {
            return this.update(user);
        } else {
            return this.create(user);
        }
    }

    delete(user: User) {
        console.log('delete from service');
        this._store.dispatch(deleteUser(user));
    }

    updateFilter(filter: string) {
        this._store.dispatch(changeFilter(filter));
    }
}
