import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page';
import { AboutPage } from './pages/about.page';
import { UsersPage } from './pages/users.page';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomePage
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
