import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressDetailComponent } from './components/address-detail/address-detail.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressRoutingModule } from './address-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AddressFormViewerComponent } from './components/address-form-viewer/address-form-viewer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AddressRoutingModule,
        SharedModule,
    ],
    declarations: [
        AddressListComponent,
        AddressDetailComponent,
        AddressFormComponent,
        AddressFormViewerComponent,
    ],
    exports: [
        AddressListComponent,
        AddressFormComponent,
    ]
})
export class AddressModule { }
