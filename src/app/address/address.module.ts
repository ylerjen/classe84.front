import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressDetailComponent } from './components/address-detail/address-detail.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressRoutingModule } from './address-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AddressRoutingModule,
    ],
    declarations: [
        AddressListComponent,
        AddressDetailComponent,
        AddressFormComponent,
    ],
    exports: [
        AddressListComponent
    ]
})
export class AddressModule { }
