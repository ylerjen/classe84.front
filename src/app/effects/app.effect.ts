import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AppActions, GetApiVersionFinished } from 'app/actions/app.actions';
import { AddNotif } from 'app/actions/notifications.actions';
import { AppService } from '../services/app/app.service';
import { Version } from 'app/models/Version';
import { Notification, ENotificationType } from 'app/models/Notification';

@Injectable()
export class AppEffects {

    @Effect()
    getApiVersion$ = this.actions$.pipe(
        ofType(AppActions.getApiVersion),
        switchMap(() => this._appSrvc.getApiVersion()),
        map((res: Version) => new GetApiVersionFinished(res)),
        catchError((err: Error) => {
            const errNotif = new Notification(JSON.stringify(err), ENotificationType.ERROR);
            return of(new AddNotif(errNotif));
        })
    );

    constructor(
        private actions$: Actions,
        private _appSrvc: AppService
    ) {}
}
