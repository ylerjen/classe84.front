import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

import { LoadersCssModule } from 'angular2-loaders-css';

import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { PanelComponent } from './panel/panel.component';
import { PhoneNbPipe } from './pipes/phone-nb.pipe';
import { FlipComponent } from './flip/flip.component';
import { GeoService } from './services/geo/geo.service';
import { NotificationService } from './services/notification/notification.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    imports: [
        CommonModule,
        LoadersCssModule,
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
    ],
    providers: [
        GeoService,
        NotificationService,
    ],
    declarations: [
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
        FlipComponent,
        DropdownComponent,
        ModalComponent,
    ],
    exports: [
        CommonModule,
        LoadersCssModule,
        BsDatepickerModule,
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
        FlipComponent,
        DropdownComponent,
        ModalComponent,
        NgxMaskModule
    ],
})
export class SharedModule { }
