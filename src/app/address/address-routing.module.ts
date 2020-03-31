import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTE_SEGMENT } from 'app/config/router.config';
import { AddressFormViewerComponent } from './components/address-form-viewer/address-form-viewer.component';

export const routesConfig: Routes = [
    {
        path: ROUTE_SEGMENT.addresses,
        children: [
            {
                path: `${ROUTE_SEGMENT.byId}/${ROUTE_SEGMENT.edit}`,
                component: AddressFormViewerComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routesConfig) ],
    exports: [ RouterModule ]
})
export class AddressRoutingModule { }
