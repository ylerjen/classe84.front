import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/User';
import { IUserState } from '../../stores/IUserState';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-list-wrapper',
    templateUrl: './user-list-wrapper.component.html',
    styleUrls: ['./user-list-wrapper.component.scss']
})
export class UserListWrapperComponent {

    private filter = '';
    private isLoading = false;
    private usersList: User[] = [];


    constructor(private usersService: UsersService, private _store: Store<IUserState>) {
        _store.select('userList')
            .subscribe( (uState: IUserState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.isLoading = uState.isLoading;
                }
            });
    }

    reloadAll() {
        this.usersService.reload();
    }

    filterChange(param) {
        console.log(param);
    }
}
