import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'app/models/User';
import { Permission, CAN_MODIFY_USERS } from '@models/Permission';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

    @Input()
    permissions: Array<Permission> = [];

    @Input()
    user: User = new User();

    @Output()
    editUser = new EventEmitter<string>();

    @Output()
    deleteUser = new EventEmitter<string>();

    onClickEdit(): void {
        if (this.user) {
            this.editUser.emit(this.user.id);
        }
    }

    onClickDelete(): void {
        if (this.user) {
            this.deleteUser.emit(this.user.id);
        }
    }

    canModify(): boolean {
        return Array.isArray(this.permissions) && this.permissions.find( perm => perm.name === CAN_MODIFY_USERS) != null;
    }
}
