import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

import { Event } from '@models/Event';
import { IGlobalState } from 'app/stores/globalState';
import { GetEventStart } from '@actions/event.actions';


@Injectable()
export class EventResolverService implements Resolve<Event>  {

    constructor(
        private store: Store<IGlobalState>,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> | Observable<never> {
        const id = route.paramMap.get('id');
        debugger;
        console.info({ place: 'resolver', id });
        this.initEventData(id);
        return this.waitForEventDataToLoad();
    }

    initEventData(id: string): void {
        this.store.pipe(take(1))
            .subscribe(store => {
                debugger;
                if (!store.eventState.event) {
                    this.store.dispatch(new GetEventStart(id));
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
