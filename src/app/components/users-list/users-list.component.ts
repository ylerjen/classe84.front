import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserState } from '../../stores/IUserState';
import { userlistReducer as usersStore} from '../../stores/userlistReducer';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: [ './users-list.component.scss' ]
})
export class UsersListComponent {
    @Input() usersState: IUserState;

    private isLoading = true;
    private filter = '';
    private usersList: User[] = [];

    constructor(private usersService: UsersService, private _store: Store<IUserState>) {
        _store.select('userList')
            .subscribe( (uState: IUserState) => {
                console.debug(uState);
                if (uState) {
                    this.usersList = uState.userList;
                    this.isLoading = uState.isLoading;
                }
            });
    }

    reloadAll() {
        this.usersService.reload();
    }
}
