import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTE_SEGMENT } from 'app/config/router.config';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UnauthorizedPage } from 'app/pages/unauthorized/unauthorized.page';
import { ForbiddenPage } from 'app/pages/forbidden/forbidden.page';
import { LoginPageComponent } from 'app/pages/login-page/login.page';
import { LogoutPageComponent } from 'app/pages/logout-page/logout-page.component';

export const authRoutes: Routes = [
    {
        path: ROUTE_SEGMENT.restorePassword,
        component: RestorePasswordComponent,
    }, {
        path: ROUTE_SEGMENT.changePassword,
        component: ChangePasswordComponent,
    }, {
        path: ROUTE_SEGMENT.unauthorized,
        component: UnauthorizedPage,
    }, {
        path: ROUTE_SEGMENT.forbidden,
        component: ForbiddenPage,
    }, {
        path: ROUTE_SEGMENT.login,
        component: LoginPageComponent,
    }, {
        path: ROUTE_SEGMENT.logout,
        component: LogoutPageComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(authRoutes) ],
    exports: [ RouterModule]
})
export class AuthRoutingModule {}
