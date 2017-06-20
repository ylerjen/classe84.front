import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import { User } from '../../models/User';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

    @Input()
    private isLoading = true;

    @Input()
    private user: User;
}
