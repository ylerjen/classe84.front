import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt';

import { environment as env } from 'app/../environments/environment';
import { Event } from 'app/models/Event';
import { Subscription } from 'app/models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import {
    addEvent,
    updateEvent,
} from 'app/actions/event.actions';
import {
    deleteEventFromList,
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
    fetchAll(): Observable<Array<Event>> {
        return this._http.get(BASE_URL)
            .map(res => res.json());
    }

    /**
     * Get the event by its id
     * @param id - the id of the event to get
     */
    get(id: string): Observable<Event> {
        const endpoint = `${BASE_URL}/${id}`;
        return this._authHttp.get(endpoint)
            .map( (resp: Response): any => resp.json() )
            .map( (evtAttr: any): Event => new Event(evtAttr) );
    }

    create(event: Event): Observable<Response> {
        this._store.dispatch(addEvent(event));
        return this._authHttp.post(BASE_URL, event)
            .map( (resp: Response) => resp.json());
    }

    update(event: Event): Observable<Response> {
        const endpoint = `${BASE_URL}/${event.id}`;
        this._store.dispatch(updateEvent(event));
        console.error('add event from service => not finished: request create api');
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
        console.error('delete from service => not finished: request delete api');
        this._store.dispatch(deleteEventFromList(event));
    }

    /**
     * Get all subscribers for an event
     * @param eventId - the id of the event
     */
    getSubscribers(eventId: string): Observable<Array<Subscription>> {
        return this._authHttp.get(`${BASE_URL}/${eventId}/users`)
            .map((resp: Response): Array<Object> => resp.json())
            .map((objArr): Array<Subscription> => (objArr.map(obj => new Subscription(obj))))
            .map((subscrList: Array<Subscription>): Array<Subscription> => subscrList.sort(Subscription.sortByFullNameComparator));
    }

    /**
     * Subscribe a user to an event
     * @param subscr - the subscription with info about the event and the user
     */
    susbcribeToEvent(subscr: Subscription): Observable<Subscription> {
        if (!subscr.event_id || !subscr.user_id) {
            throw new Error(`Trying to subscribe to an event, but userId ${subscr.user_id} or eventId ${subscr.event_id} is missing.`);
        }
        const route = `${BASE_URL}/${subscr.event_id}/users/${subscr.user_id}`;
        return this._authHttp.post(route, {})
            .map((resp: Response): Subscription => subscr);
    }

    /**
     * Unsubscribe a user from an event
     * @param subscr - the subscription with info about the event and the user
     */
    unsubscribeFromEvent(subscr: Subscription): Observable<Subscription> {
        if (!subscr.event_id || !subscr.user_id) {
            throw new Error(`Trying to unsubscribe from an event, but userId ${subscr.user_id} or eventId ${subscr.event_id} is missing.`);
        }
        const route = `${BASE_URL}/${subscr.event_id}/users/${subscr.user_id}`;
        return this._authHttp.delete(route)
            .map((resp: Response): Subscription => subscr);
    }
}
