import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressDetailComponent } from './address-detail/address-detail.component';

@NgModule({
  imports: [
    CommonModule,
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
