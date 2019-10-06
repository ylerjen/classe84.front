import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { appRoutes } from './config/router.config';

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: false }),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
