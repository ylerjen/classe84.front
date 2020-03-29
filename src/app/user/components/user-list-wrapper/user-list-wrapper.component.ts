import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';


import { User } from '@models/User';
import { UserListState } from 'app/user/states/reducers/userlist/userlist.reducer';
import { IUserListFilter } from '../user-list-filter/user-list-filter.component';
import { GetUserListAsync } from 'app/user/states/actions/userlist.actions';
import { UserModuleState } from 'app/user/states/user.state';
import { selectUserlist, selectUserlistState } from 'app/user/states/selectors/userlist.selector';

@Component({
    selector: 'app-user-list-wrapper',
    templateUrl: './user-list-wrapper.component.html',
    styleUrls: ['./user-list-wrapper.component.scss']
})
export class UserListWrapperComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    public filter: IUserListFilter = {
        name: '',
        activeOnly: false
    };
    public isLoading = false;
    public usersList: User[] = [];
    public filteredList: User[] = [];
    public errors: Array<Error> = [];

    constructor(
        private _store: Store<UserModuleState>,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.sub = this._store.pipe(select(selectUserlistState))
            .subscribe( (uState: UserListState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.filterList();
                    this.isLoading = uState.isLoading;
                    this.errors = uState.errors;
                }
            });
        this._store.dispatch(new GetUserListAsync());
        this.sub.add(this._activeRoute.queryParams
            .subscribe(
                (params: IUserListFilter) => {
                    if (params) {
                        this.filter = params;
                    }
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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
        if (!this.filter.name) {
            delete this.filter.name;
        }
        if (!this.filter.activeOnly) {
            delete this.filter.activeOnly;
        }
        this._router.navigate([], {
            queryParams: this.filter,
            relativeTo: this._activeRoute
        });
    }
}
