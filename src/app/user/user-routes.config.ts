import { Routes } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { ROUTE_URL, routeBuilder } from '../config/router.config';
import { UserPageComponent } from '../user/pages/user-page/user-page.component';
import { UserFormViewerComponent } from '../user/components/user-form-viewer/user-form-viewer.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';



export const userRoutes: Routes = [
    {
        path: routeBuilder.userlist(),
        children: [
            {
                path: '',
                component: UserListPageComponent,
            }, {
                path: ROUTE_URL.byId,
                component: UserPageComponent,
                canActivate: [ AuthService ],
            }
        ]
    }, {
        path: routeBuilder.userEdit(ROUTE_URL.byId),
        component: UserFormViewerComponent
    }
];
