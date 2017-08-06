import { Component, Input, OnInit } from '@angular/core';
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

    private filter: IUserListFilter = {
        name: '',
        activeOnly: false
    };
    private isLoading = false;
    private usersList: User[] = [];
    private filteredList: User[] = [];

    constructor(
        private _usersService: UsersService,
        private _store: Store<IUserListState>,
        private _notifSrvc: NotificationService
    ) { }

    ngOnInit(): void {
        this._store.select('userlistState')
            .subscribe( (uState: IUserListState) => {
                if (uState) {
                    this.usersList = uState.userList;
                    this.filteredList = uState.userList;
                    this.isLoading = uState.isLoading;
                }
            });
            this.reloadAll();
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
        this._usersService.reload()
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

    filterChange(filter) {
        this.filterList(filter);
    }
}
