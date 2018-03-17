import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { GMAP_API_KEY } from '../config/settings';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
        apiKey: GMAP_API_KEY
    }),
  ],
  declarations: [
    AddressListComponent,
    AddressDetailComponent,
  ],
  exports: [
    AddressListComponent
  ]
})
export class AddressModule { }
