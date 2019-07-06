import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from 'app/stores/globalState';
import { LogoutAction } from '@actions/session.actions';

@Component({
    selector: 'app-logout-page',
    templateUrl: './logout-page.component.html',
    styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {
    constructor(private _store: Store<GlobalState>) {}

    ngOnInit() {
        this._store.dispatch(new LogoutAction());
    }
}
