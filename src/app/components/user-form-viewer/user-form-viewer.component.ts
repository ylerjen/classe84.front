import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserState } from '../../stores/user/userReducer';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-form-viewer',
  templateUrl: './user-form-viewer.component.html',
  styleUrls: ['./user-form-viewer.component.scss']
})
export class UserFormViewerComponent {

    public user: User;

    constructor(private _store: Store<IUserState>) {
        this._store.select('userState')
            .subscribe((userState: IUserState) => this.user = userState.user);
    }
}
