import { Component, Input } from '@angular/core';

import { User } from 'app/models/User';

@Component({
    selector: 'app-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent {
    @Input() user: User;
}
