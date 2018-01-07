import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEventState } from '../../../stores/event/eventReducer';
import { Event } from '../../../models/Event';
import { ROUTE_URL } from '../../../config/router.config';

@Component({
    selector: 'app-event-detail-viewer',
    templateUrl: './event-detail-viewer.component.html',
    styleUrls: ['./event-detail-viewer.component.scss']
})
export class EventDetailViewerComponent implements OnInit, OnDestroy {

    public event: Event;

    private store$: Observable<IEventState>;
    private sub: Subscription;

    constructor(
        private _store: Store<IEventState>,
        private _router: Router
    ) {
        this.store$ = this._store.select('eventState');
    }

    ngOnInit(): void {
        this.sub = this.store$
            .subscribe(
                (eventState: IEventState) => {
                    if (eventState.event) {
                        const curEvent = new Event(eventState.event);
                        this.event = curEvent;
                    }
                }
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    goToEdit(id: number): void {
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.event}/${id.toString()}/edit`;
        this._router.navigate([url]);
    }

    delete(id: number): void {
        console.log('delete', id);
        throw new Error('not implemented yet');
    }
}
