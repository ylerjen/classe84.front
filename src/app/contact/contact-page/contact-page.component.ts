import { Component, ViewChild } from '@angular/core';

import { Contact } from 'app/models/Contact';
import { ContactService } from '../services/contact.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

    @ViewChild(ContactFormComponent, {static: false})
    contactForm: ContactFormComponent;

    public isSending: boolean;

    constructor(
        private _contactSrvc: ContactService,
        private _notifSrvc: NotificationService,
    ) {}

    onSubmitContactForm(contact) {
        this.isSending = true;
        this.sendContactMail(contact);
    }

    sendContactMail(contact: Contact) {
        this._contactSrvc.sendContactMail(contact)
            .subscribe(
                () => {
                    this._notifSrvc.notifySuccess('Contact email sent');
                    this.contactForm.reset();
                },
                err => this._notifSrvc.notifyError('An error prevent your contact mail to be sent'),
                () => this.isSending = false
            );
    }
}
