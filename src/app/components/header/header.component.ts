import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Session } from '@models/Session';
import { GlobalState } from 'app/stores/globalState';
import { LogoutAction } from '@actions/session.actions';
import { SessionState } from 'app/stores/session/session.reducer';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    public session: Session;

    public isCollapsed = true;

    constructor(
        private _store: Store<GlobalState>,
    ) { }

    ngOnInit(): void {
        this.sub = this._store.select(store => store.sessionState)
            .subscribe(
                (sState: SessionState) => this.session = sState.session,
                (err) => console.error('error', err)
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onLogout(event: Event): void {
        event.preventDefault();
        this._store.dispatch(new LogoutAction());
    }
}
