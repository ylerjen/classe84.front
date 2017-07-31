import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isCollapsed = true;

    public isLoggedIn = false;

    constructor(
        private _store: Store<IGlobalState>,
    ) { }

    ngOnInit(): void {
        this._store.select('sessionState')
            .subscribe(
                (sState: ISessionState) => this.isLoggedIn = sState.isLoggedIn,
                (err) => console.log('error', err)
            );
    }

    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
