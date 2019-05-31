
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../../environments/environment';
import { User } from '@models/User';
import { Subscription } from '@models/Subscription';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    constructor(
        private _http: HttpClient
    ) { }

    fetchAll(): Observable<Array<User>> {
        return this._http.get<Array<User>>(BASE_URL).pipe(
            map( (objList: Array<any>): Array<User> => objList.map( obj => new User(obj))));
    }

    get(id: string): Observable<User> {
        const endpoint = `${BASE_URL}/${id}`;
        return this._http
            .get<User>(endpoint).pipe(
            map(u => new User(u)));
    }

    create(user: User): Observable<User> {
        console.warn('add user from service, to verify');
        return this._http.post<User>(BASE_URL, user);
    }

    update(user: User): Observable<User> {
        const endpoint = `${BASE_URL}/${user.id}`;
        console.warn('add user from service => not finished: request create api');
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
     * @returns the list of event at which the user attended
     */
    getParticipations(id: string): Observable<Array<Subscription>> {
        return this._http.get(`${BASE_URL}/${id}/events`).pipe(
            map( (events: Array<any>): Array<Subscription> => events.map(evt => {
                const sub = new Subscription(evt);
                sub.user_id = id;
                sub.event = evt;
                sub.event_id = evt.id;
                return sub;
            })));
    }

    /**
     * Get the top 3 users with the most participations to events
     */
    getTopSubscriptions(): Observable<Array<User>> {
        return this._http.get<Array<User>>(`${BASE_URL}/top-subscribers`);
    }
}
