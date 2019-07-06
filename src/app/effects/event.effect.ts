
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EventActionTypes, GetEventSuccess, GetEventFailed, GetEvent, EventActions } from '../actions/event.actions';
import { EventsService } from '../event/services/events.service';
import { ForbiddenError } from '@models/ForbiddenError';
import { UnauthorizedError } from '@models/UnauthorizedError';
import { NotificationService } from '@shared/services/notification/notification.service';

@Injectable()
export class EventEffects {
    @Effect()
    getEvent$ = this.actions.pipe(
        ofType(EventActionTypes.getEvent),
        switchMap((action: GetEvent) => {
            const id = action.payload;
            return this.evtSrvc.get(id);
        }),
        map(event => new GetEventSuccess(event)),
        catchError((err: Error) => of(new GetEventFailed(err)))
    );

    @Effect({dispatch: false})
    getEventFailed$ = this.actions.pipe(
        ofType(EventActionTypes.getEventFailed),
        map((action: Action) => {
            const act = action as GetEventFailed;
            if ( !(act.payload instanceof UnauthorizedError || act.payload instanceof ForbiddenError )) {
                this.notifSrvc.notifyError(`Une erreur s'est produite. Veuillez recharger la page.
                    Si le problème persiste, contactez un administrateur du site`);
            }
        }),
        catchError((err: Error) => of(new GetEventFailed(err)))
    );

    constructor(
        private evtSrvc: EventsService,
        private actions: Observable<EventActions>,
        private notifSrvc: NotificationService,
    ) { }
}
