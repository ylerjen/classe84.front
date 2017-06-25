import { Routes } from '@angular/router';

import { AuthService } from '../services/auth/auth.service';
import { HomePage } from '../pages/home-page/home.page';
import { AboutPage } from '../pages/about-page/about.page';
import { UsersPage } from '../pages/userlist-page/users.page';
import { LoginPage } from '../pages/login-page/login.page';
import { UserPage } from '../pages/user-page/user.page';
import { UserFormViewerComponent } from '../components/user-form-viewer/user-form-viewer.component';
import { UserDetailViewerComponent } from '../components/user-detail-viewer/user-detail-viewer.component';

export const ROUTE_URL: { [key: string]: string } = {
    default: '',
    about: 'about',
    login: 'login',
    events: 'events',
    eventById: 'events/:id',
    users: 'users',
    userById: 'users/:id'
};

export const appRoutes: Routes = [
    {
        path: ROUTE_URL.default,
        component: HomePage
    }, {
        path: ROUTE_URL.userById,
        component: UserPage,
        canActivate: [ AuthService ],
        children: [
            { path: '', pathMatch: 'full', component: UserDetailViewerComponent },
            { path: 'edit', component: UserFormViewerComponent }
        ]
    }, {
        path: ROUTE_URL.users,
        component: UsersPage
    }, {
        path: ROUTE_URL.events,
        component: UsersPage
    }, {
        path: ROUTE_URL.about,
        component: AboutPage
    }, {
        path: ROUTE_URL.login,
        component: LoginPage
    }/*, {
        path: 'heroes',
        component: HeroListComponent,
        data: {
            title: 'Heroes List'
        }
    }, {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    }, {
        path: '**',
        component: PageNotFoundComponent
    }*/
];
