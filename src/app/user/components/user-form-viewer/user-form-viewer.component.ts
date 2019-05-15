import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IUserState } from 'app/stores/user/user.reducer';
import { User } from 'app/models/User';
import { updateUser } from 'app/actions/user.actions';
import { UsersService } from 'app/user/services/users.service';
import { NotificationService } from '@shared/services/notification/notification.service';

import { ROUTE_URL } from 'app/config/router.config';
import { IGlobalState } from 'app/stores/globalState';

@Component({
  selector: 'app-user-form-viewer',
  templateUrl: './user-form-viewer.component.html',
  styleUrls: ['./user-form-viewer.component.scss']
})
export class UserFormViewerComponent {

    public user: User;

    constructor(
        private _store: Store<IGlobalState>,
        private _userSrvc: UsersService,
        private _notifSrvc: NotificationService,
        private _router: Router
    ) {
        this._store.select(store => store.userState)
            .subscribe((userState: IUserState) => {
                if (userState.user) {
                    this.user = new User(userState.user);
                }
            });
    }

    saveUser(user: User) {
        console.log(user);
        this._userSrvc.save(user)
            .subscribe(
                (resp) => {
                    this._store.dispatch(updateUser(user));
                    this._notifSrvc.notifySuccess('User saved');
                    this.goToDetails(user.id);
                },
                (err) => this._notifSrvc.notifyError(`Fail ${JSON.stringify(err)}`)
            );
    }

    goToDetails(userId: string) {
        this._router.navigate([`/${ROUTE_URL.users}/${userId}`]);
    }
}
