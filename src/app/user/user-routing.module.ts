import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { userRoutes } from './user-routes.config';

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    declarations: [],
    providers: [],
    bootstrap: [],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
