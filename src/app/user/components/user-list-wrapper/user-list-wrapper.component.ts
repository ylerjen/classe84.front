import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';


import { User } from 'app/models/User';
import { IUserListState } from 'app/stores/userlist/userlist.reducer';
import { IUserListFilter } from '../user-list-filter/user-list-filter.component';
import { IGlobalState } from 'app/stores/globalState';
import { GetUserListAsync } from 'app/actions/userlist.actions';

@Component({
    selector: 'app-user-list-wrapper',
    templateUrl: './user-list-wrapper.component.html',
    styleUrls: ['./user-list-wrapper.component.scss']
})
export class UserListWrapperComponent implements OnInit {

    public filter: IUserListFilter = {
        name: '',
        activeOnly: false
    };
    public isLoading = false;
    public usersList: User[] = [];
    public filteredList: User[] = [];
    public errors: Array<Error> = [];

    constructor(
        private _store: Store<IGlobalState>,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._store.select(store => store.userlistState)
            .subscribe( (uState: IUserListState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.filterList();
                    this.isLoading = uState.isLoading;
                    this.errors = uState.errors;
                }
            });
        this._store.dispatch(new GetUserListAsync());
        this._activeRoute.queryParams.subscribe(
            (params: IUserListFilter) => {
                if (params) {
                    this.filter = params;
                }
            }
        );
    }

    filterList() {
        this.filteredList = this.usersList.filter(user => {
            const nameFilter = (this.filter.name) ? this.filter.name.toLowerCase() : '';
            const checkNameSearch = user.first_name.toLowerCase().includes(nameFilter) ||
                user.last_name.toLowerCase().includes(nameFilter) ||
                (user.maiden_name && user.maiden_name.toLowerCase().includes(nameFilter) );
            const checkActiveOnly = !this.filter.activeOnly || (this.filter.activeOnly && user.is_active);

            return checkNameSearch && checkActiveOnly;
        });
    }

    onFilterChange(filter: IUserListFilter) {
        this.filter = filter;
        this.filterList();
        this.updateCurrentRoute();
    }

    updateCurrentRoute() {
        this._router.navigate([], {
            queryParams: this.filter,
            relativeTo: this._activeRoute
        });
    }
}
