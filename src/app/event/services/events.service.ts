import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from '../../../environments/environment';
import { IGlobalState } from '../../stores/globalState';
import { Event } from '../../models/Event';
import { Subscription } from '../../models/Subscription';
import {
    addEvent,
    updateEvent,
    getEventAsyncStart,
    getEventAsyncFinished
} from '../../actions/events.actions';
import { 
    deleteEventFromEventlist,
    changeEventListFilter, 
    getEventListAsyncStart,
} from 'app/actions/eventlist.actions';

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
        this._store.dispatch( getEventListAsyncStart());
        return this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => getEventAsyncFinished(payload));
    }

    /**
     * Get the event by its id
     * @param id - the id of the event to get
     */
    get(id: number): Observable<Event> {
        const endpoint = `${BASE_URL}/${id}`;
        this._store.dispatch( getEventAsyncStart());
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
        this._store.dispatch(deleteEventFromEventlist(event));
    }

    updateFilter(filter: string) {
        this._store.dispatch(changeEventListFilter(filter));
    }

    /**
     * Get all subscribers for an event
     * @param eventId - the id of the event
     */
    getSubscribers(eventId: number): Observable<Array<Subscription>> {
        return this._authHttp.get(`${BASE_URL}/${eventId}/users`)
            .map((resp: Response): Array<Subscription> => resp.json());
    }
}
