import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IUserState } from '../../../stores/user/userReducer';
import { User } from '../../../models/User';
import { updateUser } from '../../../actions/users.actions';
import { UsersService } from '../../../services/users/users.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-user-form-viewer',
  templateUrl: './user-form-viewer.component.html',
  styleUrls: ['./user-form-viewer.component.scss']
})
export class UserFormViewerComponent {

    public user: User;

    constructor(
        private _store: Store<IUserState>,
        private _userSrvc: UsersService,
        private _notifSrvc: NotificationService,
        private _router: Router
    ) {
        this._store.select('userState')
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

    goToDetails(userId: number) {
        this._router.navigate([`/users/${userId}`]);
    }
}