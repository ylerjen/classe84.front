import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/User';
import { IUserListState } from '../../stores/IState';
import { IUserListFilter } from '../user-list-filter/user-list-filter.component';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-user-list-wrapper',
    templateUrl: './user-list-wrapper.component.html',
    styleUrls: ['./user-list-wrapper.component.scss']
})
export class UserListWrapperComponent implements OnInit {

    private filter: IUserListFilter = {
        name: '',
        activeOnly: false
    };
    private isLoading = false;
    private usersList: User[] = [];
    private filteredList: User[] = [];

    constructor(private usersService: UsersService, private _store: Store<IUserListState>) { }

    ngOnInit(): void {
        this._store.select('userList')
            .subscribe( (uState: IUserListState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.filteredList = uState.userList;
                    this.isLoading = uState.isLoading;
                }
            });
    }

    filterList(filter) {
        this.filteredList = this.usersList.filter(user => {
            const nameFilter = (filter.name) ? filter.name.toLowerCase() : '';
            const checkNameSearch = user.first_name.toLowerCase().includes(nameFilter) ||
                user.last_name.toLowerCase().includes(nameFilter) ||
                (user.maiden_name && user.maiden_name.toLowerCase().includes(nameFilter) );
            const checkActiveOnly = !filter.activeOnly || (filter.activeOnly && user.is_active);

            return checkNameSearch && checkActiveOnly;
        });
    }

    reloadAll() {
        this.usersService.reload();
    }

    filterChange(filter) {
        this.filterList(filter);
    }
}
