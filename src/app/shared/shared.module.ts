import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, CollapseModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
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
import { CoordinatesFormComponent } from './coordinates-form/coordinates-form.component';
import { StaticMapComponent } from './static-map/static-map.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoadersCssModule,
        BsDatepickerModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        NgxMaskModule.forRoot(),
        ModalModule.forRoot(),
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
        CoordinatesFormComponent,
        StaticMapComponent,
    ],
    exports: [
        CommonModule,
        LoadersCssModule,
        BsDatepickerModule,
        BsDropdownModule,
        NgxMaskModule,
        ModalModule,
        CollapseModule,
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
        FlipComponent,
        DropdownComponent,
        ModalComponent,
        CoordinatesFormComponent,
        StaticMapComponent,
    ],
})
export class SharedModule { }
