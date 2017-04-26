import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ADD_USER, DELETE_USER } from '../stores/usersReducer';

import { User } from '../models/User';

export interface UsersState {
    userList: User[];
    isLoading: boolean;
}

@Component({
    selector: 'users-page',
    templateUrl: './users.page.html',
    // styleUrls: ['./users.page.scss']
})
export class UsersPage {
    private userList$: Observable<User[]>;
    private isLoading$: Observable<boolean>;

    constructor(private _store: Store<UsersState>) {
		this.userList$ = _store.select('userList');
		this.isLoading$ = _store.select('isLoading');
	}

    addUser() {
        this._store.dispatch({
            type: ADD_USER
        });
    }

    deleteUser() {
        this._store.dispatch({
            type: DELETE_USER
        });
    }
}