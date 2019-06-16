import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UUID } from 'angular2-uuid';

import { PasswordChangeObject } from '@models/Login';
import { IGlobalState } from 'app/stores/globalState';
import { ChangePassword } from '@actions/session.actions';
import { PasswordConfirmFormComponent } from '../password-confirm-form/password-confirm-form.component';

/**
 * The ChangePasswordComponent is used to change the password of the current login session.
 * It's not used for a password recovery.
 */
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    public compId: string;

    public isLoading = true;

    public changePasswordForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _store: Store<IGlobalState>,
    ) { }

    ngOnInit() {
        this.compId = UUID.UUID();
        this.changePasswordForm = this._fb.group(
            {
                actualPassword: ['', Validators.required],
                passwordConfirmForm: PasswordConfirmFormComponent.getFormGroup()
            }
        );
    }

    changePassword($event: Event): void {
        const values = this.changePasswordForm.value as PasswordChangeObject;
        console.log('change password with', values);
        this._store.dispatch(new ChangePassword(values));
    }
}
