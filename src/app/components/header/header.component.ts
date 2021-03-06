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
    host: {
        '(document:click)': 'closeToggle($event)',
    },
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isCollapsed = true;

    public isAccountDropdownOpen = false;

    public session: Session;

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

    toggleCollapse(shouldCollapse: boolean | null = null): void {
        this.isCollapsed = (typeof shouldCollapse === 'boolean') ? shouldCollapse : !this.isCollapsed;
    }

    closeToggle(event: Event): void {
        if (!this._elRef.nativeElement.contains(event.target)) {
            event.stopPropagation();
            this.toggleCollapse(true);
        }
    }

    toggleAccountDropdownState(evt: Event): void {
        evt.preventDefault();
        this.isAccountDropdownOpen = !this.isAccountDropdownOpen;
    }

    onLogout(event: Event): void {
        event.preventDefault();
        this._store.dispatch(logout());
    }
}
