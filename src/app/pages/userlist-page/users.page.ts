import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { User } from '../../models/User';
import { IUserState } from '../../stores/user/userReducer';
import { UsersService } from '../../services/users/users.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'users-page',
    templateUrl: './users.page.html',
    // styleUrls: ['./users.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UsersPage implements OnInit {

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.usersService.reload();
    }

    addUser(user: User) {
        this.usersService.create(user);
    }

    deleteUser(user: User) {
        this.usersService.delete(user);
    }
}
