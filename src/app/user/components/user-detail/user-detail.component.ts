import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../../models/User';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

    @Input()
    user: User = new User();

    @Output()
    goToEditUser = new EventEmitter<number>();

    @Output()
    deleteUser = new EventEmitter<number>();

    onClickEdit(): void {
        if (this.user) {
            this.goToEditUser.emit(this.user.id);
        }
    }

    onClickDelete(): void {
        if (this.user) {
            this.deleteUser.emit(this.user.id);
        }
    }
}
