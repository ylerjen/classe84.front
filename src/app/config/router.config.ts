import { Routes } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { LoginPage } from '../pages/login-page/login.page';
import { HomePage } from '../pages/home-page/home.page';
import { AboutPage } from '../pages/about-page/about.page';
import { EventlistPageComponent } from '../event/pages/eventlist/eventlist-page.component';
import { EventPageComponent } from '../event/pages/event/event-page.component';
import { NotFoundPage } from '../pages/not-found/not-found.page';
import { UnauthorizedPage } from '../pages/unauthorized/unauthorized.page';

export const ROUTE_URL: { [key: string]: string } = {
    default: '',
    about: 'about',
    login: 'login',
    events: 'events',
    users: 'users',
    byId: ':id',
    edit: 'edit',
    address: 'addresses',
    contact: 'contact',
    unauthorized: 'unauthorized',
};

export const appRoutes: Routes = [
    {
        path: ROUTE_URL.default,
        component: HomePage
    },
    {
        path: ROUTE_URL.unauthorized,
        component: UnauthorizedPage
    },
    {
        path: ROUTE_URL.about,
        component: AboutPage
    },
    {
        path: ROUTE_URL.login,
        component: LoginPage
    },
    // {
    //     path: '',
    //     redirectTo: '/',
    //     pathMatch: 'full'
    // },
    // {
    //     path: '**',
    //     component: NotFoundPage
    // }
];
