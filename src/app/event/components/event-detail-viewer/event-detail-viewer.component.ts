import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEventState } from '../../../stores/event/event.reducer';
import { Event } from '../../../models/Event';
import { ROUTE_URL } from '../../../config/router.config';
import { IGlobalState } from '../../../stores/globalState';

@Component({
    selector: 'app-event-detail-viewer',
    templateUrl: './event-detail-viewer.component.html',
    styleUrls: ['./event-detail-viewer.component.scss']
})
export class EventDetailViewerComponent implements OnInit, OnDestroy {

    public event: Event;
    public isLoading: boolean;
    private store$: Observable<IEventState>;
    private sub: Subscription;

    constructor(
        private _store: Store<IGlobalState>,
        private _router: Router
    ) {
        this.store$ = this._store.select('eventState');
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.sub = this.store$
            .subscribe(
                (eventState: IEventState) => {
                    if (eventState.event) {
                        const curEvent = new Event(eventState.event);
                        this.event = curEvent;
                        this.isLoading = eventState.isLoading;
                    }
                },
                (err) => console.error(err),
                () => this.isLoading = false
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    goToEdit(id: number): void {
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.events}/${id.toString()}/edit`;
        this._router.navigate([url]);
    }

    delete(id: number): void {
        console.log('delete', id);
        throw new Error('not implemented yet');
    }
}
