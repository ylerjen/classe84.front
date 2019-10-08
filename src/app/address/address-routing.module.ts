import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routesConfig } from './address-routes.config';

@NgModule({
    imports: [
        RouterModule.forChild(routesConfig),
    ],
    exports: [
        RouterModule,
    ]
})
export class AddressRoutingModule { }
