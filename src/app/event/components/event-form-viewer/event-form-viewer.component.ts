import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ISessionState } from '../../../stores/session/session.reducer';
import { IEventState } from '../../../stores/event/eventReducer';
import { EventsService } from '../../services/events.service';
import { Event as EventModel } from '../../../models/Event';
import { updateEvent } from '../../../actions/events.actions';
import { NotificationService } from '../../../services/notification/notification.service';

import { ROUTE_URL } from '../../../config/router.config';

@Component({
    selector: 'app-event-form-viewer',
    templateUrl: './event-form-viewer.component.html',
    styleUrls: ['./event-form-viewer.component.scss']
})
export class EventFormViewerComponent {

    private _sessionState: ISessionState;
    
    public event: EventModel;

    constructor(
        private _store: Store<IEventState>,
        private _evtSrvc: EventsService,
        private _notifSrvc: NotificationService,
        private _router: Router
    ) {
        this._store.select('eventState')
            .subscribe((eventState: IEventState) => {
                this.event = new EventModel(eventState.event);
            });
        this._store.select('sessionState')
            .subscribe( (sessionState: ISessionState) => {
                console.log(sessionState);
            });
    }

    saveEvent(event: EventModel) {
        console.log(event);
        if (!event.id) {
            event.created_by = this._sessionState.loggedUser.id;
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

    goToDetails(eventId: number) {
        this._router.navigate([`/${ROUTE_URL.events}/${eventId}`]);
    }
}
