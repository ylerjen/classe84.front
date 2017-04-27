import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { User } from '../models/User';
import { UsersState } from '../stores/userlistReducer';
import { UsersService } from '../services/users.service';

@Component({
    selector: 'users-page',
    templateUrl: './users.page.html',
    // styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {

    private userList$: Observable<User[]>;
    private isLoading$: Observable<boolean>;

    constructor(private usersService: UsersService, private _store: Store<UsersState>) {
        this.userList$ = _store.select('userList');
        this.isLoading$ = _store.select('isLoading');
        console.debug(this.isLoading$)
    }

    ngOnInit(): void {
        this.usersService.reload();
    }

    addUser(user: User) {
        this.usersService.add(user);
    }

    deleteUser(user: User) {
        this.usersService.delete(user);
    }
}