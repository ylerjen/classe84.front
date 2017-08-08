import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';
import { Event } from '../../models/Event';
const BASE_URL = `${env.API_URL}/events`;

@Injectable()
export class EventsService {

    constructor(private _http: Http) { }

    fetchAll(): Observable<Array<Event>> {
        return this._http.get(BASE_URL)
            .map((resp: Response): Array<Event> => resp.json());
    }

}
