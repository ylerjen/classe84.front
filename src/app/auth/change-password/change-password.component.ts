import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

import { PasswordConfirmFormComponent } from '../password-confirm-form/password-confirm-form.component';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '@shared/services/notification/notification.service';

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
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
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
        const values = this.changePasswordForm.value;
        console.log('change password with', values);
        this._authSrvc.changePassword(values)
            .subscribe(
                resp => alert('yes changed')
            );
    }
}
