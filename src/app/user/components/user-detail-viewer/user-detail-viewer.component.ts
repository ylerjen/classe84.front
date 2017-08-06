import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IUserState } from '../../../stores/user/userReducer';
import { User } from '../../../models/User';
import { ROUTE_URL } from '../../../config/router.config';

@Component({
    selector: 'app-user-detail-viewer',
    templateUrl: './user-detail-viewer.component.html',
    styleUrls: ['./user-detail-viewer.component.scss']
})
export class UserDetailViewerComponent implements OnInit, OnDestroy {

    public user: User;

    private store$: Observable<IUserState>;
    private sub: Subscription;

    constructor(
        private _store: Store<IUserState>,
        private _router: Router
    ) {
        this.store$ = this._store.select('userState');
    }

    ngOnInit(): void {
        this.sub = this.store$.subscribe((userState: IUserState) => this.user = userState.user);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    goToEdit(id: number): void {
        console.log('goToEdit', id);
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.users}/${id.toString()}/edit`;
        this._router.navigate([url]);
    }
    delete(id: number): void {
        console.log('delete', id);
        throw new Error('not implemented yet');
    }
}
