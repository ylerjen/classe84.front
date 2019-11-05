import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'app/models/User';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

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
}
