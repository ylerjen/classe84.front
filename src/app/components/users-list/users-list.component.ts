import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/User';


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
    @Input() userList: User[] = [];
    @Input() isLoading: boolean= true;


}
