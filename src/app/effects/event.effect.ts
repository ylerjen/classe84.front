
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { EventActions, GetEventFinished, GetEventFailed, GetEventStart } from '../actions/event.actions';
import { EventsService } from '../event/services/events.service';
import { ForbiddenError } from '@models/ForbiddenError';
import { UnauthorizedError } from '@models/UnauthorizedError';
import { NotificationService } from '@shared/services/notification/notification.service';

@Injectable()
export class EventEffects {
    @Effect()
    getEventStart$ = this.actions$.pipe(
        ofType(EventActions.getEventStart),
        switchMap((action: Action) => {
            const act = action as GetEventStart;
            const id = act.payload;
            return this._evtSrvc.get(id);
        }),
        map(event => new GetEventFinished(event)),
        catchError((err: Error) => of(new GetEventFailed(err)))
    );

    @Effect()
    getEventFailed$ = this.actions$.pipe(
        ofType(EventActions.getEventFailed),
        map((action: Action) => {
            const act = action as GetEventFailed;
            if ( !(act.payload instanceof UnauthorizedError || act.payload instanceof ForbiddenError )) {
                this._notifSrvc.notifyError(`Une erreur s'est produite. Veuillez recharger la page.
                    Si le problème persiste, contactez un administrateur du site`);
            }
            return of({ type: `NO ACTION` });
        }),
        catchError((err: Error) => of(new GetEventFailed(err)))
    );

    constructor(
        private _evtSrvc: EventsService,
        private actions$: Actions,
        private _notifSrvc: NotificationService,
    ) { }
}
