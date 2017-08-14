import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReCaptchaModule } from 'angular2-recaptcha';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReCaptchaModule,
    ],
    declarations: [
        ContactPageComponent,
        ContactFormComponent,
    ]
})
export class ContactModule { }
