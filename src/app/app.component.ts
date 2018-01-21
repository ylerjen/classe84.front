import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppState, AppVersion } from './stores/app/app.reducer';
import { storeFrontVersion, storeApiVersion } from './actions/app.actions';
import { Version } from './models/Version';
import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { login, logout } from './actions/session.actions';

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
                (err: Error) => console.error(err)
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
            this._authSrvc.getAuthUser()
                .subscribe( (resp) => {
                    this._store.dispatch(login({ loggedUser: resp, token }));
                },
                (err: Error) => this._store.dispatch(logout())
            );
        }
    }
}
