import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IGlobalState } from '../../stores/globalState';
import { Event } from '../../models/Event';
import { User } from '../../models/User';
import {
    addEvent,
    updateEvent,
    deleteEvent,
    changeFilter,
    GET_EVENT,
    ASYNC_EVENT_START,
    ASYNC_EVENT_SUCCESS,
    ASYNC_EVENTLIST_START,
    ASYNC_EVENTLIST_SUCCESS,
    CHANGE_FILTER
} from '../../actions/events.actions';

const BASE_URL = `${env.API_URL}/events`;

@Injectable()
export class EventsService {

    constructor(
        private _http: Http,
        private _store: Store<IGlobalState>,
        private _authHttp: AuthHttp) { }

    /**
     * Fetch all events
     */
    fetchAll(): Observable<Action> {
        this._store.dispatch( { type: ASYNC_EVENTLIST_START});
        return this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: ASYNC_EVENTLIST_SUCCESS, payload }));
    }

    /**
     * Get the event by its id
     * @param id - the id of the event to get
     */
    get(id: number): Observable<Event> {
        const endpoint = `${BASE_URL}/${id}`;
        this._store.dispatch( { type: ASYNC_EVENT_START});
        return this._authHttp.get(endpoint)
            .map( (resp: Response): Event => resp.json());
    }

    create(event: Event): Observable<Response> {
        console.log('add event from service');
        this._store.dispatch(addEvent(event));
        return this._authHttp.post(BASE_URL, event)
            .map( (resp: Response) => resp.json());
    }

    update(event: Event): Observable<Response> {
        const endpoint = `${BASE_URL}/${event.id}`;
        this._store.dispatch(updateEvent(event));
        console.log('add event from service => not finished: request create api');
        return this._authHttp.put(endpoint, event)
            .map( (resp: Response) => resp.json());
    }

    save(event: Event): Observable<Response>  {
        if (event.id) {
            return this.update(event);
        } else {
            return this.create(event);
        }
    }

    delete(event: Event) {
        console.log('delete from service => not finished: request delete api');
        this._store.dispatch(deleteEvent(event));
    }

    updateFilter(filter: string) {
        this._store.dispatch(changeFilter(filter));
    }

    /**
     * Get all subscribers for an event
     * @param eventId - the id of the event
     */
    getParticipants(eventId: number): Observable<Array<User>> {
        return this._authHttp.get(`${BASE_URL}/${eventId}/users`)
            .map((resp: Response): Array<User> => resp.json());
    }
}
