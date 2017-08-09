import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { Event } from '../../models/Event';
import { User } from '../../models/User';

const BASE_URL = `${env.API_URL}/events`;

@Injectable()
export class EventsService {

    constructor(private _http: AuthHttp) { }

    fetchAll(): Observable<Array<Event>> {
        return this._http.get(BASE_URL)
            .map((resp: Response): Array<Event> => resp.json());
    }

    get(id: number): Observable<Event> {
        return this._http.get(`${BASE_URL}/${id}`)
            .map((resp: Response): Event => new Event(resp.json()))
            .catch((error: any) => {
                if (error.status < 400 ||  error.status === 500) {
                    return Observable.throw(new Error(error.status));
                }
            });
    }

    getParticipants(id: number): Observable<Array<User>> {
        return this._http.get(`${BASE_URL}/${id}/users`)
            .map((resp: Response): Array<User> => resp.json());
    }
}
