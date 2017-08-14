import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

    @Input()
    public recaptchaKey: string;

    public contactForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.contactForm = this.fb.group({
            name: ['', Validators.required, Validators.maxLength(12)],
            email: ['', Validators.required, Validators.email, Validators.maxLength(12) ],
            message: ['', Validators.required, Validators.maxLength(12) ]
        });
    }

}
