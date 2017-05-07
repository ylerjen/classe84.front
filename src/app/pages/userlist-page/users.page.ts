import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { User } from '../../models/User';
import { IUserState } from '../../stores/IState';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-page',
    templateUrl: './users.page.html',
    // styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {

    constructor(private usersService: UsersService) {}

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
