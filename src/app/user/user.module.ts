import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { GMAP_API_KEY } from 'app/config/settings';
import { SharedModule } from 'app/shared/shared.module';
import { AddressModule } from 'app/address/address.module';
import { AuthService } from '../services/auth/auth.service';
import { UsersService } from './services/users.service';
import { AddressService } from '../address/address.service';
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

const userRoutes = [
    { path: 'users', component: UserListPageComponent },
    {
        path: 'users/:id',
        component: UserPageComponent,
        canActivate: [ AuthService ],
        children: [
            { path: '', component: UserDetailViewerComponent },
            { path: 'edit', component: UserFormViewerComponent },
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        AddressModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: GMAP_API_KEY
        }),
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
    exports: [
        RouterModule
    ]
})
export class UserModule { }
