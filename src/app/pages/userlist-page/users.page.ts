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

    public nextBirthdayUsers: Array<User> = [];

    constructor(private _userSrvc: UsersService) {}

    ngOnInit(): void {
        this._userSrvc.reload();
        console.log('fetch next birthday');
        this._userSrvc.fetchNextBirthday()
            .subscribe( (userList: Array<User>) => this.nextBirthdayUsers = userList);
    }

    addUser(user: User) {
        this._userSrvc.create(user);
    }

    deleteUser(user: User) {
        this._userSrvc.delete(user);
    }
}
