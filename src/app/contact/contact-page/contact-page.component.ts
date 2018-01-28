import { Component, ViewChild } from '@angular/core';
import { Response } from '@angular/http';

import { RECAPTCHA_KEY } from '../../config/settings';
import { Contact } from 'app/models/Contact';
import { ContactService } from '../services/contact.service';
import { NotificationService } from '../../services/notification/notification.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

    @ViewChild(ContactFormComponent) contactForm: ContactFormComponent;

    public recaptchaApiKey: string;

    public isSending: boolean;

    constructor(
        private _contactSrvc: ContactService,
        private _notifSrvc: NotificationService,
    ) {
        this.recaptchaApiKey = RECAPTCHA_KEY;
    }

    onSubmitContactForm(contact) {
        this.isSending = true;
        this.sendContactMail(contact);
    }

    sendContactMail(contact: Contact) {
        this._contactSrvc.sendContactMail(contact)
            .finally(() => this.isSending = false)
            .subscribe(
                (resp: Response) => {
                    this._notifSrvc.notifySuccess('Contact email sent');
                    this.contactForm.reset();
                },
                (err) => this._notifSrvc.notifyError('An error prevent your contact mail to be sent')
            );
    }
}
