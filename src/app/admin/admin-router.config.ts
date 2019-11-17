import { Routes } from '@angular/router';
import { routeBuilder, ROUTE_URL } from 'app/config/router.config';
import { UserListPageComponent } from 'app/user/pages/user-list-page/user-list-page.component';
import { UserPageComponent } from 'app/user/pages/user-page/user-page.component';
import { AuthService } from 'app/auth/services/auth.service';
import { UserFormViewerComponent } from 'app/user/components/user-form-viewer/user-form-viewer.component';

export const adminRoutes: Routes = [
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
