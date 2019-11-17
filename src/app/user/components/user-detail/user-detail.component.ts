import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'app/models/User';
import { Permission } from '@models/Permission';
import { PermissionType } from '@models/PermissionType';
import { routeBuilder } from 'app/config/router.config';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    private _user: User;

    @Input()
    permissions: Array<string> = [];

    @Input()
    set user(val: User) {
        this._user = val;
        this.editUrl = val ? routeBuilder.userEdit(val.id) : '';
    }

    get user() {
        return this._user;
    }

    @Output()
    editUser = new EventEmitter<string>();

    @Output()
    deleteUser = new EventEmitter<string>();

    public editUrl: string;

    onClickDelete(): void {
        if (this.user) {
            this.deleteUser.emit(this.user.id);
        }
    }

    canModify(): boolean {
        if (!Array.isArray(this.permissions)) {
            return false;
        }
        return !!this.permissions.find( perm => perm === PermissionType.WriteUsers);
    }
}
