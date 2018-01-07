import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../../models/User';
import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';
import { AuthService } from '../../services/auth/auth.service';

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

    public isLoggedIn = false;

    public loggedUser: User;

    constructor(
        private _elRef: ElementRef,
        private _store: Store<IGlobalState>,
        private _authSrvc: AuthService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._store.select('sessionState')
            .subscribe(
                (sState: ISessionState) => {
                    this.isLoggedIn = sState.isLoggedIn;
                    this.loggedUser = sState.loggedUser;
                },
                (err) => console.log('error', err)
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

    onLogout(event: Event): void {
        event.preventDefault();
        this._authSrvc.logout( () => {
            this._router.navigate(['login']);
        });
    }
}
