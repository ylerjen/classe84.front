import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { ROUTE_SEGMENT, routeBuilder } from '../config/router.config';
import { UserPageComponent } from '../user/pages/user-page/user-page.component';
import { UserFormViewerComponent } from '../user/components/user-form-viewer/user-form-viewer.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

/**
 * The route definition for the user module
 */
export const userRoutes: Routes = [
    {
        path: ROUTE_SEGMENT.users,
        children: [
            {
                path: ROUTE_SEGMENT.default,
                component: UserListPageComponent,
            }, {
                path: ROUTE_SEGMENT.add,
                component: UserFormViewerComponent,
            }, {
                path: ROUTE_SEGMENT.byId,
                component: UserPageComponent,
                canActivate: [AuthService],
            }, {
                path: routeBuilder.editById(),
                component: UserFormViewerComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(userRoutes) ],
    exports: [ RouterModule ],
})
export class UserRoutingModule { }
