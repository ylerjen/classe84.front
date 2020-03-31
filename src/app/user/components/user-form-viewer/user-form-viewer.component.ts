import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from '@models/User';
import { UpdateUser } from 'app/user/states/actions/user.actions';
import { UsersService } from 'app/user/services/users.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { ROUTE_SEGMENT } from 'app/config/router.config';
import { selectUser } from 'app/user/states/selectors/user.selector';
import { UserModuleState } from 'app/user/states/user.state';

const httpRegexp = new RegExp('http(s?):\/\/');

@Component({
    selector: 'app-user-form-viewer',
    templateUrl: './user-form-viewer.component.html',
    styleUrls: ['./user-form-viewer.component.scss']
})
export class UserFormViewerComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    private _user: User;

    public set user(val: User) {
        if (val && this.hasHttpPrefix(val.website)) {
            val.website = val.website.replace(httpRegexp, '');
        }
        this._user = val;
    }
    public get user(): User {
        return this._user;
    }

    constructor(
        private _store: Store<UserModuleState>,
        private _userSrvc: UsersService,
        private _notifSrvc: NotificationService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.sub = this._store.pipe(select(selectUser))
            .subscribe((user: User) => this.user = new User(user));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    hasHttpPrefix(url) {
        return (url && url.match(httpRegexp));
    }

    saveUser(user: User) {
        if (!this.hasHttpPrefix(user.website)) {
            user.website = 'https://' + user.website;
        }

        this._userSrvc.save(user)
            .subscribe(
                (resp) => {
                    this._store.dispatch(new UpdateUser(user));
                    this._notifSrvc.notifySuccess('User saved');
                    this.goToDetails(user.id);
                },
                (err) => this._notifSrvc.notifyError(`Fail ${JSON.stringify(err)}`)
            );
    }

    goToDetails(userId: string) {
        this._router.navigate([`/${ROUTE_SEGMENT.users}/${userId}`]);
    }
}
