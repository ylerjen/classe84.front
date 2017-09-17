import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response } from '@angular/http';

import { environment } from '../environments/environment';
import { AppState, AppVersion } from './stores/app/appReducer';
import { storeFrontVersion, storeApiVersion } from './actions/app.actions';
import { Version } from './models/Version';
import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { login } from './actions/session.actions';

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
        private _store: Store<AppState>,
        private _appSrvc: AppService,
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) {
        this._store.select('appState')
            .subscribe(
                (resp: AppState) => this.version = resp.version,
                err => console.error(err),
                () => console.log('on finish')
            );
    }

    ngOnInit(): void {
        this._store.dispatch(storeFrontVersion(environment.version));
        this._appSrvc.getApiVersion().subscribe(
            (resp: Version): void => this._store.dispatch(storeApiVersion(resp)),
            (err: any): void => {
                this._notifSrvc.notifyError(JSON.stringify(err));
            }
        );
        const token = this._authSrvc.getTokenFromStorage();
        if (token) {
            this._store.dispatch(login(token));
        }
    }
}
