import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppState, AppVersion } from './stores/app/appReducer';
import { storeFrontVersion, storeApiVersion } from './actions/app.actions';
import { AppService } from './services/app/app.service';
import { LoginService } from './services/login/login.service';
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
        private _appSrvc: AppService,
        private _store: Store<AppState>,
        private _loginSrvc: LoginService
    ) {
        this._store.select('appState')
            .subscribe(
                (resp: AppState) => this.version = resp.version,
                (err) => console.error(err),
                () => console.log('on finish')
            );
        }

        ngOnInit(): void {
            this._store.dispatch(storeFrontVersion(environment.version));
            this._appSrvc.getApiVersion().subscribe(
                (resp) => this._store.dispatch(storeApiVersion(resp))
            );
            const token = this._loginSrvc.getTokenFromStorage();
            if (token) {
                this._store.dispatch(login(token));
            }
    }
}
