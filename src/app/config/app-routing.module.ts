import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTE_SEGMENT } from './router.config';
import { HomePage } from 'app/pages/home-page/home.page';
import { AboutPage } from 'app/pages/about-page/about.page';
import { ContactPageComponent } from 'app/contact/contact-page/contact-page.component';

const appRoutes: Routes = [
    {
        path: ROUTE_SEGMENT.default,
        component: HomePage,
    }, {
        path: ROUTE_SEGMENT.about,
        component: AboutPage,
    }, {
        path: ROUTE_SEGMENT.contact,
        component: ContactPageComponent,
    },
    // {
    //     path: '',
    //     redirectTo: '/',
    //     pathMatch: 'full'
    // },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: false }),
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
