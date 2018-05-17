import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Session } from 'app/models/Session';
import { IGlobalState } from 'app/stores/globalState';
import { logout } from '@actions/session.actions';
import { ISessionState } from 'app/stores/session/session.reducer';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public session: Session;

    public isCollapsed = true;

    constructor(
        private _elRef: ElementRef,
        private _store: Store<IGlobalState>,
        private _authSrvc: AuthService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._store.select('sessionState')
            .subscribe(
                (sState: ISessionState) => this.session = sState.session,
                (err) => console.error('error', err)
            );
    }

    onLogout(event: Event): void {
        event.preventDefault();
        this._store.dispatch(logout());
    }
}
