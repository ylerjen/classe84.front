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
    private filteredList: User[] = [];

    constructor(private usersService: UsersService, private _store: Store<IUserState>) {
        _store.select('userList')
            .subscribe( (uState: IUserState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.filteredList = uState.userList;
                    this.isLoading = uState.isLoading;
                }
            });
    }

    filterList(filter) {
        const lcFilter = filter.toLowerCase();
        this.filteredList = this.usersList.filter(user => {
            return (user.first_name.toLowerCase().includes(lcFilter) ||
                user.last_name.toLowerCase().includes(lcFilter) ||
                (user.maiden_name && user.maiden_name.toLowerCase().includes(lcFilter)) );
        });
    }

    reloadAll() {
        this.usersService.reload();
    }

    filterChange(evt) {
        const filterStr = evt.target.value;
        this.filterList(filterStr);
    }
}
