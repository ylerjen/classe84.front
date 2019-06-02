import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IGlobalState } from '../../stores/globalState';
import { SessionExpiredAction } from '@actions/session.actions';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'unauthorized-page',
    templateUrl: './unauthorized.page.html',
    styleUrls: ['./unauthorized.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UnauthorizedPage implements OnInit {

    constructor(
        private store: Store<IGlobalState>,
    ) { }

    ngOnInit() {
        this.store.dispatch(new SessionExpiredAction());
    }

}
