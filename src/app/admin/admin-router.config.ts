import { Routes } from '@angular/router';
import { routeBuilder } from 'app/config/router.config';

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
