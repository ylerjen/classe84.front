import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IGlobalState } from 'app/stores/globalState';
import { logout } from '@actions/session.actions';

@Component({
    selector: 'app-logout-page',
    templateUrl: './logout-page.component.html',
    styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {
    constructor(private _store: Store<IGlobalState>) {}

    ngOnInit() {
        this._store.dispatch(logout());
    }
}
