import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable ,  throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment as env } from 'app/../environments/environment';
import { Event } from 'app/models/Event';
import { Subscription } from 'app/models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import { AddEvent, UpdateEvent} from 'app/actions/event.actions';
import { deleteEventFromList } from 'app/actions/eventlist.actions';
import { ErrorWithContext } from '@models/ErrorWithContext';
import { User } from '@models/User';

const BASE_URL = `${env.API_URL}/events`;

@Injectable()
export class EventsService {

    constructor(
        private _store: Store<IGlobalState>,
        private _authHttp: HttpClient
    ) { }

    /**
     * Fetch all events
     */
    fetchAll(): Observable<Array<Event>> {
        return this._authHttp.get<Array<Event>>(BASE_URL);
    }

    /**
     * Get the event by its id
     * @param id - the id of the event to get
     */
    get(id: string): Observable<Event> {
        const endpoint = `${BASE_URL}/${id}`;
        return this._authHttp.get<Event>(endpoint).pipe(
            map( (evtAttr: any): Event => new Event(evtAttr) ));
    }

    create(event: Event): Observable<Event> {
        this._store.dispatch(new AddEvent(event));
        return this._authHttp.post<Event>(BASE_URL, event);
    }

    update(event: Event): Observable<Event> {
        const endpoint = `${BASE_URL}/${event.id}`;
        this._store.dispatch(new UpdateEvent(event));
        console.error('add event from service => not finished: request create api');
        return this._authHttp.put<Event>(endpoint, event);
    }

    save(event: Event): Observable<Event>  {
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
            .pipe(
                map((objArr: Array<User>): Array<Subscription> => (objArr.map(user => {
                    const sub = new Subscription(user);
                    sub.event_id = eventId;
                    sub.user = new User(user);
                    sub.user_id = user.id;
                    return sub;
                }))),
                map((subscrList: Array<Subscription>): Array<Subscription> => subscrList.sort(Subscription.sortByFullNameComparator))
            );
    }

    /**
     * Subscribe a user to an event
     * @param subscr - the subscription with info about the event and the user
     */
    susbcribeToEvent(subscr: Subscription): Observable<Subscription|ErrorWithContext<Subscription>> {
        if (!subscr.event_id || !subscr.user_id) {
            throw new Error(`Trying to subscribe to an event, but userId ${subscr.user_id} or eventId ${subscr.event_id} is missing.`);
        }
        const route = `${BASE_URL}/${subscr.event_id}/users/${subscr.user_id}`;
        return this._authHttp.post<Subscription>(route, {})
            .pipe(
                map(resp => new Subscription(resp)),
                // If the service failed, we return the error and the subscription to create
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err);
                    const actionPayload = new ErrorWithContext<Subscription>(err, subscr);
                    return throwError(actionPayload);
                })
            );
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
        return this._authHttp.delete<Subscription>(route)
            .pipe(
                // Delete will return a 204 (No content). So we return the created subscription instead of the empty body.
                map(() => subscr),
                // If the service failed, we return the error and the subscription to delete
                catchError(err => {
                    console.log('Handling error locally and rethrowing it...', err);
                    const actionPayload = new ErrorWithContext<Subscription>(err, subscr);
                    return throwError(actionPayload);
                })
            );
    }

    /**
     * Find the next planned event if any
     * @returns an observable of 'getNextEvent' request's response body
     */
    getNextEvent(): Observable<Event> {
        const route = `${BASE_URL}/next`;
        return this._authHttp.get<Event>(route)
            .pipe(
                map( json => new Event(json))
            );
    }
}
