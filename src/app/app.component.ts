import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { environment } from '../environments/environment';
import { Version } from './models/Version';
import { GlobalState } from './stores/globalState';
import { SetExistingSession } from './actions/session.actions';
import { AppVersion } from './stores/app/app.reducer';
import { StoreFrontVersion, GetApiVersion } from './actions/app.actions';
import { AuthService } from './auth/services/auth.service';
import { Router, NavigationError, NavigationCancel, NavigationEnd, NavigationStart, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private _version: AppVersion;
    set version(val) { this._version = val; }
    get version() { return this._version; }

    constructor(
        private _store: Store<GlobalState>,
        private _authSrvc: AuthService,
    ) {
        this._store.select(store => store.appState)
            .subscribe(
                (resp) => this.version = resp.version,
                (err: Error) => console.error(err)
            );
    }

    ngOnInit(): void {
        this._store.dispatch(new StoreFrontVersion(new Version(environment.version)));
        this._store.dispatch(new GetApiVersion());

        const session = this._authSrvc.getStoredSession();
        if (session && this._authSrvc.isTokenValid(session.token)) {
            this._store.dispatch(new SetExistingSession(session));
        }
    }
}
