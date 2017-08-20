import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { RECAPTCHA_KEY } from '../../config/settings';
import { Contact } from '../models/Contact';
import { ContactService } from '../services/contact.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

    public recaptchaApiKey;

    constructor(
        private _contactSrvc: ContactService,
        private _notifSrvc: NotificationService,
    ) {
        this.recaptchaApiKey = RECAPTCHA_KEY;
    }

    onSubmitContactForm($event) {
        const contact = {
            name: 'chuck',
            email: 'email',
            message: 'hello world'
        };
        this.sendContactMail(contact);
    }

    sendContactMail(contact: Contact) {
        this._contactSrvc.sendMail(contact)
            // .subscribe((resp: Response) => {
            //     if (resp.status === 200) {
            //         this._notifSrvc.notifySuccess('Contact email sent');
            //     }
            // });
    }
}
