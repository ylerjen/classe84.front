import { Routes } from '@angular/router';
import { HomePage } from '../pages/home-page/home.page';
import { AboutPage } from '../pages/about-page/about.page';
import { UsersPage } from '../pages/userlist-page/users.page';
import { UserPage } from '../pages/user-page/user-page';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomePage
    }, {
        path: 'users/:id',
        component: UserPage
    }, {
        path: 'users',
        component: UsersPage
    }, {
        path: 'events',
        component: UsersPage
    }, {
        path: 'about',
        component: AboutPage
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
