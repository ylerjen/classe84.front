import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ReCaptchaComponent } from 'angular2-recaptcha';

import { Contact } from 'app/models/Contact';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

    @Input()
    public recaptchaKey: string;

    @Output()
    public onSubmitEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

    @ViewChild(ReCaptchaComponent) recaptcha: ReCaptchaComponent;

    public isCaptchaValid = false;

    public contactForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.contactForm = this.fb.group({
            name: new FormControl('', [ Validators.required, Validators.maxLength(12) ]),
            email: new FormControl('', [ Validators.required, Validators.email ]),
            message: new FormControl('', [ Validators.required, Validators.minLength(10) ]),
            captcha: new FormControl('')
        });
    }

    handleCorrectCaptcha(captchaValue) {
        this.isCaptchaValid = true;
        this.contactForm.controls.captcha.setValue(captchaValue);
    }

    handleCaptchaExpired($event) {
        this.isCaptchaValid = false;
        this.contactForm.controls.captcha.setValue("");
    }

    isValid() {
        return this.contactForm.valid && this.isCaptchaValid;
    }

    reset() {
        this.contactForm.reset();
    }

    onSubmit(event: Event) {
        event.preventDefault();
        this.onSubmitEvent.emit(this.contactForm.value);
    }

}
