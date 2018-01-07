import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid'

@Component({
    selector: 'app-password-confirm-form',
    templateUrl: './password-confirm-form.component.html',
    styleUrls: ['./password-confirm-form.component.scss']
})
export class PasswordConfirmFormComponent implements OnInit {

    /**
     * Used to prefix the elements id and avoid duplicates
     */
    public compId: string;

    public passwordConfirmForm: FormGroup;


    constructor(
        private _fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.compId = UUID.UUID();

        this.passwordConfirmForm = this._fb.group({
            password: ['', Validators.required],
            passwordConfirmation: ['', Validators.required],
        });
    }
}
