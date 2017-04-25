import { Routes } from '@angular/router';
import { UsersPage } from './pages/users.page';
import { AboutPage } from './pages/about.page';

export const appRoutes: Routes = [
    {
        path: '',
        component: UsersPage
    }, {
        path: 'users',
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
