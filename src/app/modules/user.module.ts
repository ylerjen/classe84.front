import { NgModule } from '@angular/core';

import { UsersPage } from '../pages/users.page';
import { UsersListComponent } from '../components/users-list/users-list.component';
import { UserListItemComponent } from '../components/user-list-item/user-list-item.component';
import { PanelComponent } from '../components/panel/panel.component';

@NgModule({
  declarations: [
    UsersPage,
    UsersListComponent,
    UserListItemComponent,
    PanelComponent
  ],
  imports: [],
  providers: [],
  bootstrap: []
})
export class UserModule { }