import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppState, AppVersion } from './stores/app/appReducer';
import { storeFrontVersion, storeApiVersion } from './actions/app.actions';
import { AppService } from './services/app/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public _version: AppVersion;

    set version(val) { console.log('setter', val); this._version = val; }
    get version() { return this._version; }

    constructor(
        private _appSrvc: AppService,
        private _store: Store<AppState>,
    ) {
        this._store.select('appState')
            .subscribe(
                (resp: AppState) => {
                    const v = resp.version;
                    console.log('from store', v);
                    this.version = v;
                },
                (err) => console.error(err),
                () => console.log('on finish')
            );
    }


    ngOnInit(): void {
        this._store.dispatch(storeFrontVersion(environment.version));
        this._appSrvc.getApiVersion().subscribe(
            (resp) => {
                console.log('from api', resp);
                this._store.dispatch(storeApiVersion(resp));
            }
        );
    }
}
