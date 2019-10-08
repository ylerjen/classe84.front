
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { AddressModule } from 'app/address/address.module';
import { UsersService } from './services/users.service';
import { AddressService } from '../address/services/address.service';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { UserListFilterComponent } from './components/user-list-filter/user-list-filter.component';
import { UserListWrapperComponent } from './components/user-list-wrapper/user-list-wrapper.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailViewerComponent } from './components/user-detail-viewer/user-detail-viewer.component';
import { UserFormViewerComponent } from './components/user-form-viewer/user-form-viewer.component';
import { EffectsModule } from '@ngrx/effects';
import { UserlistEffects } from 'app/effects/userlist.effect';
import { UserEffects } from 'app/effects/user.effect';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [
        SharedModule,
        AddressModule,
        UserRoutingModule,
        EffectsModule.forFeature([
            UserEffects,
            UserlistEffects,
        ]),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        UserListPageComponent,
        UserPageComponent,
        UsersListComponent,
        UserListItemComponent,
        UserDetailComponent,
        UserDetailViewerComponent,
        UserListFilterComponent,
        UserListWrapperComponent,
        UserFormViewerComponent,
        UserFormComponent,
    ],
    providers: [
        UsersService,
        AddressService
    ],
    bootstrap: [],
})
export class UserModule { }
