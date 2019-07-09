import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User, EGender } from 'app/models/User';
import { UserListState } from 'app/stores/userlist/userlist.reducer';
import { UsersService } from 'app/user/services/users.service';
import { GlobalState } from 'app/stores/globalState';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'user-list-page',
    templateUrl: './user-list-page.component.html',
    styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {

    public nextBirthdayUsers: Array<User> = [];
    public top3SubscribersList: Array<User> = [];
    public totalActive = 0;
    public totalMembers = 0;
    public totalMen = 0;
    public totalWomen = 0;


    constructor(
        private _userSrvc: UsersService,
        private _store: Store<GlobalState>,
    ) {}

    ngOnInit(): void {
        this._userSrvc.fetchNextBirthday()
            .subscribe( (userList: Array<User>) => this.nextBirthdayUsers = userList);

        this._userSrvc.getTopSubscriptions()
            .subscribe( (userList: Array<User>) => this.top3SubscribersList = userList);

        this._store.select(store => store.userlistState)
            .subscribe( (uState: UserListState) => {
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
