import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { User, EGender } from '../../../models/User';
import { IUserListState } from '../../../stores/userlist/userlistReducer';
import { IUserState } from '../../../stores/user/userReducer';
import { UsersService } from '../../../services/users/users.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-list-page',
    templateUrl: './user-list-page.component.html',
    // styleUrls: ['./users.page.scss']
})
export class UserListPageComponent implements OnInit {

    public nextBirthdayUsers: Array<User> = [];
    public totalActive = 0;
    public totalMembers = 0;
    public totalMen = 0;
    public totalWomen = 0;


    constructor(
        private _userSrvc: UsersService,
        private _store: Store<IUserListState>,
    ) {}

    ngOnInit(): void {
        this._userSrvc.reload();
        this._userSrvc.fetchNextBirthday()
            .subscribe( (userList: Array<User>) => this.nextBirthdayUsers = userList);
        this._store.select('userlistState')
            .subscribe( (uState: IUserListState) => {
                if (uState) {
                    const usersList = uState.userList;
                    this.totalMembers = usersList.length;
                    this.totalActive = usersList.filter((user: User) => user.is_active).length;
                    this.totalMen = usersList.filter((user: User) => user.gender === EGender.Male).length;
                    this.totalWomen = this.totalMembers - this.totalMen;
                }
            });
    }

    addUser(user: User) {
        this._userSrvc.create(user);
    }

    deleteUser(user: User) {
        this._userSrvc.delete(user);
    }
}
