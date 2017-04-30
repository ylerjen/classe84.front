import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-list-filter',
    templateUrl: './user-list-filter.component.html',
    styleUrls: ['./user-list-filter.component.scss']
})
export class UserListFilterComponent {

    @Input() filter: string;

    constructor() { }
}
