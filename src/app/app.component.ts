import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';

import { environment } from '../environments/environment';
import { Version } from './models/Version';
import { IGlobalState } from './stores/globalState';
import { setExistingSession } from './actions/session.actions';
import { AppVersion } from './stores/app/app.reducer';
import { storeFrontVersion, getApiVersion } from './actions/app.actions';
import { AuthService } from './auth/services/auth.service';

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
        private _authSrvc: AuthService,
    ) {
        this._store.select(store => store.appState)
            .subscribe(
                (resp) => this.version = resp.version,
                (err: Error) => console.error(err)
            );
    }

    ngOnInit(): void {
        this._store.dispatch(storeFrontVersion(new Version(environment.version)));
        this._store.dispatch(getApiVersion());

        const session = this._authSrvc.getStoredSession();
        if (session && this._authSrvc.isTokenValid(session.token)) {
            this._store.dispatch(setExistingSession(session));
        }
    }
}
