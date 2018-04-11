import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AppActions, getApiVersionFinished } from 'app/actions/app.actions';
import { addNotif } from 'app/actions/notifications.actions';
import { AppService } from '../services/app/app.service';
import { Version } from 'app/models/Version';
import { Notification, ENotificationType } from 'app/models/Notification';

@Injectable()
export class AppEffects {

    @Effect()
    getApiVersion$ = this.actions$
        .ofType(AppActions.getApiVersion)
        .switchMap(payload => this._appSrvc.getApiVersion()
        .map((res: Version) => getApiVersionFinished(res))
        .catch((err: Error) => {
            const errNotif = new Notification(JSON.stringify(err), ENotificationType.ERROR);
            return Observable.of(addNotif(errNotif));
        })
    );


    constructor(
        private actions$: Actions,
        private _appSrvc: AppService
    ) {}
}
