import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule, CollapseModule, BsDropdownModule, ModalModule, TypeaheadModule } from 'ngx-bootstrap';
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
import { ReactiveFormsModule } from '@angular/forms';
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
        TypeaheadModule.forRoot(),
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
        TypeaheadModule,
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
