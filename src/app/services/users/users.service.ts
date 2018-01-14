import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IGlobalState } from '../../stores/globalState';
import { User } from '../../models/User';
import { Event } from '../../models/Event';
import { Notification, ENotificationType } from '../../models/Notification';
import { IUserListState } from '../../stores/userlist/userlistReducer';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import {
    addUser,
    updateUser,
    deleteUser,
    changeFilter,
    getUserAsync,
    getUserListAsync,
    getUserListAsyncSuccess,
} from '../../actions/users.actions';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    constructor(
        private _http: Http,
        private _store: Store<IGlobalState>,
        private _authHttp: AuthHttp
    ) { }

    fetchAll(): Observable<Action> {
        this._store.dispatch( getUserListAsync() );
        return this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => (getUserListAsyncSuccess(payload)));
    }

    get(id: number): Observable<User> {
        const endpoint = `${BASE_URL}/${id}`;
        this._store.dispatch( getUserAsync());
        return this._authHttp.get(endpoint)
            .map( (resp: Response): User => resp.json());
    }

    create(user: User): Observable<Response> {
        console.error('add user from service, to verify');
        this._store.dispatch(addUser(user));
        return this._authHttp.post(BASE_URL, user)
            .map( (resp: Response) => resp.json());
    }

    update(user: User): Observable<Response> {
        const endpoint = `${BASE_URL}/${user.id}`;
        this._store.dispatch(updateUser(user));
        console.error('add user from service => not finished: request create api');
        return this._authHttp.put(endpoint, user)
            .map( (resp: Response) => resp.json());
    }

    save(user: User): Observable<Response>  {
        if (user.id) {
            return this.update(user);
        } else {
            return this.create(user);
        }
    }

    delete(user: User) {
        console.error('delete from service => not finished: request delete api');
        this._store.dispatch(deleteUser(user));
    }

    updateFilter(filter: string) {
        this._store.dispatch(changeFilter(filter));
    }

    fetchNextBirthday(): Observable<Array<User>> {
        return this._http.get(`${BASE_URL}/next-birthday`)
            .map((resp: Response): Array<User> => resp.json());
    }

    getSubscriptions(id: number): Observable<Array<Event>> {
        return this._authHttp.get(`${BASE_URL}/${id}/events`)
            .map( (resp: Response): Array<Event> => resp.json());

    }
}
