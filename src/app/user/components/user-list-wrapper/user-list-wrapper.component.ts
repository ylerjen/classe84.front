import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { User } from '../../../models/User';
import { IUserListState } from '../../../stores/userlist/userlistReducer';
import { IUserListFilter } from '../user-list-filter/user-list-filter.component';
import { UsersService } from '../../../services/users/users.service';
import { NotificationService } from '../../../services/notification/notification.service';

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

    constructor(
        private _usersService: UsersService,
        private _store: Store<IUserListState>,
        private _notifSrvc: NotificationService,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._store.select('userlistState')
            .subscribe( (uState: IUserListState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.filterList();
                    this.isLoading = uState.isLoading;
                }
            });
        this.loadAll();
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

    loadAll() {
        this._usersService.fetchAll()
            .catch( (error: Response) => {
                let msg;
                if (error.status === 0) {
                    msg = 'API unreachable. Please contact the administrator.';
                } else {
                    msg = error.body || error.statusText;
                }
                this._notifSrvc.notifyError(msg);
                return Observable.throw(error.body);
            })
            .subscribe(action => this._store.dispatch(action));
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
