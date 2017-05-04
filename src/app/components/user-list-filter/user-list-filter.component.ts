import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IUserListFilter {
    name: string;
    activeOnly: boolean;
}

@Component({
    selector: 'app-user-list-filter',
    templateUrl: './user-list-filter.component.html',
    styleUrls: ['./user-list-filter.component.scss']
})
export class UserListFilterComponent {

    @Input()
    filter: IUserListFilter = {
        name: '',
        activeOnly: false
    };

    @Output()
    update: EventEmitter<IUserListFilter> = new EventEmitter<IUserListFilter>();

    constructor() { }
}
