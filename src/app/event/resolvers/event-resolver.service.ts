import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

import { Event } from '@models/Event';
import { GlobalState } from 'app/stores/globalState';
import { GetEvent } from 'app/event/states/actions/event.actions';
import { GetSubscriptionStart } from '@actions/subscription.actions';
import { EventModuleState } from '../states/event.state';


@Injectable()
export class EventResolverService implements Resolve<Event>  {

    constructor(
        private store: Store<EventModuleState>,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> | Observable<never> {
        const id = route.paramMap.get('id');
        this.initEventData(id);
        return this.waitForEventDataToLoad();
    }

    initEventData(id: string): void {
        this.store.pipe(take(1))
            .subscribe(store => {
                if (!store.eventState.event) {
                    this.store.dispatch(new GetEvent(id));
                    this.store.dispatch(new GetSubscriptionStart(id));
                }
            });
    }
    waitForEventDataToLoad(): Observable<Event> {
        return this.store.select(s => s.eventState)
            .pipe(
                map(store => store.event),
                filter(eventData => !!eventData),
                take(1),
            );
    }
}
