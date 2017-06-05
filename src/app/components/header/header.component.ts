import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../stores/appState';
import { ISessionState } from '../../stores/session/session.reducer';
import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isCollapsed = true;

    public isLoggedIn = false;

    constructor(
        private _loginSrv: LoginService,
        private _store: Store<IAppState>,
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

    requestSignIn($event: MouseEvent): void {
        $event.preventDefault();
        this._loginSrv.requestSignIn(true);
    }
}
