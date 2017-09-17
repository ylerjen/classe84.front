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

    public model: IUserListFilter = {
        name: '',
        activeOnly: false
    };

    @Input()
    set filter(val: IUserListFilter) {
        this.model.name = val.name;
        this.model.activeOnly = val.activeOnly;
    };
    get filter(): IUserListFilter {
        return this.model;
    }

    @Output()
    update: EventEmitter<IUserListFilter> = new EventEmitter<IUserListFilter>();
}
