import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppVersion } from './stores/app/app.reducer';
import { storeFrontVersion, getApiVersion } from './actions/app.actions';
import { Version } from './models/Version';
import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { login, logout, setExistingSession } from './actions/session.actions';
import { IGlobalState } from './stores/globalState';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public _version: AppVersion;

    set version(val) { this._version = val; }
    get version() { return this._version; }

    constructor(
        private _store: Store<IGlobalState>,
        private _appSrvc: AppService,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) {
        this._store.select('appState')
            .subscribe(
                (resp) => this.version = resp.version,
                (err: Error) => console.error(err)
            );
    }

    ngOnInit(): void {
        this._store.dispatch(storeFrontVersion(new Version(environment.version)));
        this._store.dispatch(getApiVersion());

        const session = this._authSrvc.getStoredSession();
        if (session) {
            this._store.dispatch(setExistingSession(session));
        }
    }
}
