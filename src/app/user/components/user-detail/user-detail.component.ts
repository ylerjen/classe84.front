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
    goToEditEvent = new EventEmitter<number>();

    @Output()
    deleteEvent = new EventEmitter<number>();

    constructor() { }

    onClickEdit(id: number): void {
        if (typeof id === 'undefined') { return; }
        this.goToEditEvent.emit(id);
    }

    onClickDelete(id: number): void {
        if (typeof id === 'undefined') { return; }
        this.deleteEvent.emit(id);
    }
}
