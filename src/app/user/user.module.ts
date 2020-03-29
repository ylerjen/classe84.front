
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
import { UserlistEffects } from 'app/user/states/effects/userlist.effect';
import { UserEffects } from 'app/user/states/effects/user.effect';
import { UserRoutingModule } from './user-routing.module';
import { userModuleReducers, userModuleFeatureKey } from './states/user.state';

@NgModule({
    imports: [
        SharedModule,
        AddressModule,
        UserRoutingModule,
        EffectsModule.forFeature([
            UserEffects,
            UserlistEffects,
        ]),
        StoreModule.forFeature(userModuleFeatureKey, userModuleReducers),
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
