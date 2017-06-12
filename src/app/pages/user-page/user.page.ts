import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserState } from '../../stores/user/userReducer';
import { UsersService } from '../../services/users/users.service';

@Component({
    selector: 'user-page',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {

    private _user$;

    constructor(private _usersService: UsersService, private _store: Store<IUserState>) { }

    ngOnInit(): void {
        this._user$ = this._store.select('userlistState');
        this._store.select('sessionState');
    }

    fetchUser(id: number) {
        this._usersService.get(id);
    }

}
