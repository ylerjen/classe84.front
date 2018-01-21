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
    getEventAsyncFinished,
    setSubscribersToEvent
} from '../../actions/event.actions';
import {
    deleteEventFromList,
    changeEventListFilter,
    getEventListAsyncStart,
    getEventListAsyncFinished
} from 'app/actions/eventlist.actions';

const BASE_URL = `${env.API_URL}/events`;

@Injectable()
export class EventsService {

    constructor(
        private _http: Http,
        private _store: Store<IGlobalState>,
        private _authHttp: AuthHttp
    ) { }

    /**
     * Fetch all events
     */
    fetchAll(): Observable<Action> {
        this._store.dispatch( getEventListAsyncStart());
        return this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => getEventListAsyncFinished(payload));
    }

    /**
     * Get the event by its id
     * @param id - the id of the event to get
     */
    get(id: string): Observable<Event> {
        const endpoint = `${BASE_URL}/${id}`;
        this._store.dispatch( getEventAsyncStart());
        return this._authHttp.get(endpoint)
            .map( (resp: Response): any => resp.json() )
            .map( (evtAttr: any): Event => new Event(evtAttr) )
            .map( (payload: Event) => {
                this._store.dispatch(getEventAsyncFinished(payload));
                return payload;
            });
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
        this._store.dispatch(deleteEventFromList(event));
    }

    /**
     * Update the filter used for the event list
     * @param filter - a text string which represent the search filter of an event
     */
    updateFilter(filter: string) {
        this._store.dispatch(changeEventListFilter(filter));
    }

    /**
     * Get all subscribers for an event
     * @param eventId - the id of the event
     */
    getSubscribers(eventId: string): Observable<Array<Subscription>> {
        return this._authHttp.get(`${BASE_URL}/${eventId}/users`)
            .map((resp: Response): Array<Subscription> => resp.json())
            .map((subscrList: Array<Subscription>): Array<Subscription> => {
                this._store.dispatch(setSubscribersToEvent(subscrList));
                return subscrList;
            });
    }

    /**
     * Subscribe a user to an event
     * @param eventId - the id of the event to subscribe to
     * @param userId - the id of the user to subscribe to the event
     */
    susbcribeToEvent(eventId: string, userId: string): Observable<any> {
        if (!eventId || !userId) {
            throw new Error(`Trying to subscribe to an event, but userId ${userId} or eventId ${eventId} is missing.`);
        }
        return this._authHttp.post(`${BASE_URL}/${eventId}/users/${userId}`, {})
            .map((resp: Response): Array<Subscription> => resp.json());
    }

    /**
     * Unsubscribe a user from an event
     * @param eventId - the id of the event to unsubscribe from
     * @param userId - the id of the user to unsubscribe from the event
     */
    unsubscribeFromEvent(eventId: string, userId: string): Observable<any> {
        if (!eventId || !userId) {
            throw new Error(`Trying to unsubscribe from an event, but userId ${userId} or eventId ${eventId} is missing.`);
        }
        return this._authHttp.delete(`${BASE_URL}/${eventId}/users/${userId}`)
            .map((resp: Response): Array<Subscription> => resp.json());
    }
}
