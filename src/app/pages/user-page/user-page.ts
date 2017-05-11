import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserState } from '../../stores/IState';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'user-page',
    templateUrl: './user-page.html',
    styleUrls: ['./user-page.scss']
})
export class UserPage implements OnInit {

    private _user$;

    constructor(private _usersService: UsersService, private _store: Store<IUserState>) { }

    ngOnInit(): void {
        this._user$ = this._store.select('userlistState');
        this._usersService.get(5);
    }

}
