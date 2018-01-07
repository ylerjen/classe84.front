import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid'

import { CustomValidators } from '../../shared/validators/CustomValidators';

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

    /**
     * The parent group which will include this current form
     */
    @Input() public parent: FormGroup;

    constructor(
        private _fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.compId = UUID.UUID();
    }

    static getFormGroup(): FormGroup {
        return new FormGroup({
                password: new FormControl('', Validators.required),
                confirmPassword: new FormControl('', Validators.required),
            },
            CustomValidators.sameFieldsContent('password', 'confirmPassword')
        );
    }   
}
