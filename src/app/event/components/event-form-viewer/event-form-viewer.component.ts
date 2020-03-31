import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { SessionState } from 'app/stores/session/session.reducer';
import { EventsService } from '../../services/events.service';
import { Event as EventModel } from '@models/Event';
import { UpdateEvent } from 'app/event/states/actions/event.actions';
import { NotificationService } from '@shared/services/notification/notification.service';
import { ROUTE_SEGMENT } from 'app/config/router.config';
import { EventModuleState } from 'app/event/states/event.state';
import { selectEvent } from 'app/event/states/selectors/event.selector';

@Component({
    selector: 'app-event-form-viewer',
    templateUrl: './event-form-viewer.component.html',
    styleUrls: ['./event-form-viewer.component.scss']
})
export class EventFormViewerComponent implements OnInit, OnDestroy {

    private subs: Subscription;
    private _sessionState: SessionState;

    public event: EventModel;

    constructor(
        private _store: Store<EventModuleState>,
        private _evtSrvc: EventsService,
        private _notifSrvc: NotificationService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.subs = this._store.pipe(select(selectEvent))
            .subscribe((event: EventModel) => this.event = new EventModel(event));
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    saveEvent(event: EventModel) {
        if (!event.id) {
            event.created_by = this._sessionState.session.user.id;
        }
        this._evtSrvc.save(event)
            .subscribe(
                (resp) => {
                    this._store.dispatch(new UpdateEvent(event));
                    this._notifSrvc.notifySuccess('Evènement sauvegardé.');
                    this.goToDetails(event.id);
                },
                (err) => this._notifSrvc.notifyError(`Fail ${JSON.stringify(err)}`)
            );
    }

    goToDetails(eventId: string) {
        this._router.navigate([`/${ROUTE_SEGMENT.events}/${eventId}`]);
    }
}
