import { Component } from '@angular/core';

import { RECAPTCHA_KEY } from '../../config/settings';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

    public recaptchaApiKey;

    constructor() {
        this.recaptchaApiKey = RECAPTCHA_KEY;
    }
}
