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
import { IUserListState } from '../../stores/userlist/userlist.reducer';
import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import {
    addUser,
    updateUser,
    deleteUser,
    getUserAsyncStart,
} from '../../actions/user.actions';
import {
    changeFilter,
    getUserListAsync,
    getUserListAsyncFinished
} from '../../actions/userlist.actions';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    constructor(
        private _http: Http,
        private _store: Store<IGlobalState>,
        private _authHttp: AuthHttp
    ) { }

    fetchAll(): Observable<Array<User>> {
        this._store.dispatch( getUserListAsync() );
        return this._http.get(BASE_URL)
            .map((res: Response): Array<any> => res.json())
            .map( (objList: Array<any>): Array<User> => objList.map( obj => new User(obj)))
            .map( (payload): Array<User> => {
                this._store.dispatch(getUserListAsyncFinished(payload));
                return payload;
            });
    }

    get(id: number): Observable<User> {
        const endpoint = `${BASE_URL}/${id}`;
        this._store.dispatch( getUserAsyncStart());
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

    /**
     * Update the filter state of the user list in the store
     * @param filter
     */
    updateFilter(filter: string) {
        this._store.dispatch(changeFilter(filter));
    }

    /**
     * Request the api to get the next users who have the birthday (can be multiple if born the same day)
     */
    fetchNextBirthday(): Observable<Array<User>> {
        return this._http.get(`${BASE_URL}/next-birthday`)
            .map((resp: Response): Array<User> => resp.json());
    }

    /**
     * Request the api to get all the events subscribed by the user
     * @param id - the id of the user
     */
    getSubscriptions(id: number): Observable<Array<Event>> {
        return this._authHttp.get(`${BASE_URL}/${id}/events`)
            .map( (resp: Response): Array<Event> => resp.json());
    }

    /**
     * Get the top 3 users with the most participations to events
     */
    getTopSubscriptions(): Observable<Array<User>> {
        return this._http.get(`${BASE_URL}/top-subscribers`)
            .map((resp: Response): Array<User> => resp.json());
    }
}
