import { Routes } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { ROUTE_URL } from '../config/router.config';
import { UserPageComponent } from '../user/pages/user-page/user-page.component';
import { UserFormViewerComponent } from '../user/components/user-form-viewer/user-form-viewer.component';
import { UserDetailViewerComponent } from '../user/components/user-detail-viewer/user-detail-viewer.component';

export const userRoutes: Routes = [
    {
        path: ROUTE_URL.users,
        children: [
            {
                path: ROUTE_URL.default,
                component: UserDetailViewerComponent,
                pathMatch: 'full'
            }, {
                path: ROUTE_URL.byId,
                component: UserPageComponent,
                canActivate: [ AuthService ],
                children: [
                    {
                        path: ROUTE_URL.edit,
                        component: UserFormViewerComponent
                    }
                ]
            }
        ]
    },
];
