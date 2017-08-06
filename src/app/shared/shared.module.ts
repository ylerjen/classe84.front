import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { PanelComponent } from './panel/panel.component';
import { PhoneNbPipe } from './pipes/phone-nb.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
    ],
    exports: [
        CommonModule,
        PanelComponent,
        PhoneNbPipe,
        ValidationErrorComponent,
    ],
})
export class SharedModule { }
