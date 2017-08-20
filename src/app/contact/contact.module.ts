import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReCaptchaModule } from 'angular2-recaptcha';
import { ContactService } from './services/contact.service';
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
    ],
    providers: [
        ContactService
    ]
})
export class ContactModule { }
