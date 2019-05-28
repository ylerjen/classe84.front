import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ISessionState } from 'app/stores/session/session.reducer';
import { IEventState } from 'app/stores/event/event.reducer';
import { EventsService } from '../../services/events.service';
import { Event as EventModel } from 'app/models/Event';
import { updateEvent } from 'app/actions/event.actions';
import { NotificationService } from '@shared/services/notification/notification.service';

import { ROUTE_URL } from 'app/config/router.config';
import { IGlobalState } from 'app/stores/globalState';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-event-form-viewer',
    templateUrl: './event-form-viewer.component.html',
    styleUrls: ['./event-form-viewer.component.scss']
})
export class EventFormViewerComponent implements OnInit, OnDestroy {

    private _sessionState: ISessionState;

    public event: EventModel;
    private subs: Subscription;

    constructor(
        private _store: Store<IGlobalState>,
        private _evtSrvc: EventsService,
        private _notifSrvc: NotificationService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.subs = this._store.select(store => store.eventState)
            .subscribe((eventState: IEventState) => {
                this.event = new EventModel(eventState.event);
            });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe()
    }

    saveEvent(event: EventModel) {
        if (!event.id) {
            event.created_by = this._sessionState.session.user.id;
        }
        this._evtSrvc.save(event)
            .subscribe(
                (resp) => {
                    this._store.dispatch(updateEvent(event));
                    this._notifSrvc.notifySuccess('Event saved');
                    this.goToDetails(event.id);
                },
                (err) => this._notifSrvc.notifyError(`Fail ${JSON.stringify(err)}`)
            );
    }

    goToDetails(eventId: string) {
        this._router.navigate([`/${ROUTE_URL.events}/${eventId}`]);
    }
}
