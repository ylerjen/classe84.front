import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadersCssModule } from 'angular2-loaders-css';

import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { PanelComponent } from './panel/panel.component';
import { PhoneNbPipe } from './pipes/phone-nb.pipe';

@NgModule({
    imports: [
        CommonModule,
        LoadersCssModule,
    ],
    declarations: [
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
    ],
    exports: [
        CommonModule,
        LoadersCssModule,
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
    ],
})
export class SharedModule { }
