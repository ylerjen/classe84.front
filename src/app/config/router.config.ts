import { Routes } from '@angular/router';

import { LoginPageComponent } from '../pages/login-page/login.page';
import { HomePage } from '../pages/home-page/home.page';
import { AboutPage } from '../pages/about-page/about.page';
import { UnauthorizedPage } from '../pages/unauthorized/unauthorized.page';
import { LogoutPageComponent } from '../pages/logout-page/logout-page.component';
import { ForbiddenPage } from '../pages/forbidden/forbidden.page';
import { ContactPageComponent } from '../contact/contact-page/contact-page.component';

export const ROUTE_URL: { [key: string]: string } = {
    default: '',
    about: 'about',
    login: 'login',
    logout: 'logout',
    events: 'events',
    users: 'users',
    byId: ':id',
    edit: 'edit',
    address: 'addresses',
    contact: 'contact',
    unauthorized: 'unauthorized',
    forbidden: 'forbidden',
};

export const appRoutes: Routes = [
    {
        path: ROUTE_URL.default,
        component: HomePage
    }, {
        path: ROUTE_URL.unauthorized,
        component: UnauthorizedPage
    }, {
        path: ROUTE_URL.forbidden,
        component: ForbiddenPage
    }, {
        path: ROUTE_URL.about,
        component: AboutPage
    }, {
        path: ROUTE_URL.contact,
        component: ContactPageComponent
    }, {
        path: ROUTE_URL.login,
        component: LoginPageComponent
    }, {
        path: ROUTE_URL.logout,
        component: LogoutPageComponent
    },
    // {
    //     path: '',
    //     redirectTo: '/',
    //     pathMatch: 'full'
    // },
];
