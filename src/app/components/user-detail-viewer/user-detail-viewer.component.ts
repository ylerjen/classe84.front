import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IUserState } from '../../stores/user/userReducer';
import { User } from '../../models/User';
import { ROUTE_URL } from '../../config/router.config';

@Component({
    selector: 'app-user-detail-viewer',
    templateUrl: './user-detail-viewer.component.html',
    styleUrls: ['./user-detail-viewer.component.scss']
})
export class UserDetailViewerComponent {

    public user: User;

    constructor(
        private _store: Store<IUserState>,
        private _router: Router
    ) {
        this._store.select('userState')
            .subscribe((userState: IUserState) => this.user = userState.user);
    }

    goToEdit(id: number): void {
        console.log('goToEdit', id);
        if (typeof id === 'undefined') { return; }
        let url = ROUTE_URL.userById.replace(':id', id.toString());
        url += '/edit';
        this._router.navigate([url]);
    }
    delete(id: number): void {
        console.log('delete', id);

    }
}
