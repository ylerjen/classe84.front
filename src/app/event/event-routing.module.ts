import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { eventRoutes } from './event-routes.config';

@NgModule({
    imports: [
        RouterModule.forChild(eventRoutes)
    ],
    declarations: [],
    providers: [],
    bootstrap: [],
    exports: [
        RouterModule
    ]
})
export class EventRoutingModule { }
