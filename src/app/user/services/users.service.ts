import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { environment as env } from '../../../environments/environment';
import { User } from 'app/models/User';
import { Event } from 'app/models/Event';
import { Subscription } from 'app/models/Subscription';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    constructor(
        private _http: HttpClient
    ) { }

    fetchAll(): Observable<Array<User>> {
        return this._http.get<Array<User>>(BASE_URL)
            .map( (objList: Array<any>): Array<User> => objList.map( obj => new User(obj)));
    }

    get(id: number): Observable<User> {
        const endpoint = `${BASE_URL}/${id}`;
        console.log(`request user ${id}`);
        return this._http
            .get<User>(endpoint)
            .map(u => new User(u));
    }

    create(user: User): Observable<User> {
        console.error('add user from service, to verify');
        return this._http.post<User>(BASE_URL, user);
    }

    update(user: User): Observable<User> {
        const endpoint = `${BASE_URL}/${user.id}`;
        console.error('add user from service => not finished: request create api');
        return this._http.put<User>(endpoint, user);
    }

    save(user: User): Observable<User>  {
        if (user.id) {
            return this.update(user);
        } else {
            return this.create(user);
        }
    }

    delete(user: User) {
        throw new Error('delete from service => not implemented: request delete api');
    }

    /**
     * Request the api to get the next users who have the birthday (can be multiple if born the same day)
     */
    fetchNextBirthday(): Observable<Array<User>> {
        return this._http.get<Array<User>>(`${BASE_URL}/next-birthday`);
    }

    /**
     * Request the api to get all the events subscribed by the user
     * @param id - the id of the user
     */
    getSubscriptions(id: string): Observable<Array<Subscription>> {
        return this._http.get(`${BASE_URL}/${id}/events`)
            .map( (events: Array<Event>) => events.map(
                evt => {
                    const subscr = new Subscription();
                    subscr.event = evt;
                    subscr.event_id = evt.id;
                    subscr.user_id = id;
                    return subscr;
                })
            );
    }

    /**
     * Get the top 3 users with the most participations to events
     */
    getTopSubscriptions(): Observable<Array<User>> {
        return this._http.get<Array<User>>(`${BASE_URL}/top-subscribers`);
    }
}
