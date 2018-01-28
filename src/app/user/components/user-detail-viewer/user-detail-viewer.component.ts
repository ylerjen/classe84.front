import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IUserState } from '../../../stores/user/user.reducer';
import { User } from '../../../models/User';
import { ROUTE_URL } from '../../../config/router.config';

@Component({
    selector: 'app-user-detail-viewer',
    templateUrl: './user-detail-viewer.component.html',
    styleUrls: ['./user-detail-viewer.component.scss']
})
export class UserDetailViewerComponent implements OnInit, OnDestroy {

    public user: User;
    public isLoading: boolean;

    private store$: Observable<IUserState>;
    private sub: Subscription;

    constructor(
        private _store: Store<IUserState>,
        private _router: Router
    ) {
        this.store$ = this._store.select('userState');
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.sub = this.store$
            .subscribe(
                (userState: IUserState) => {
                    if (userState.user) {
                        const curUser = new User(userState.user);
                        this.user = curUser;
                        this.isLoading = userState.isLoading;
                    }
                },
                () => {},
                () => this.isLoading = false
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    goToEdit(id: number): void {
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.users}/${id.toString()}/edit`;
        this._router.navigate([url]);
    }

    delete(id: number): void {
        console.log('delete', id);
        throw new Error('not implemented yet');
    }
}
