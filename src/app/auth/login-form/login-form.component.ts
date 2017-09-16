import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ICredentials } from '../../models/Login';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    @Output() public loginEvent = new EventEmitter();

    public loginForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _authSrvc: AuthService,
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        const creds = this._authSrvc.getRememberedCreds();
        if (creds) {
            this.loginForm.setValue(creds);
        }
    }

    createForm() {
        this.loginForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: false
        });
    }

    resetForm() {
        this.loginForm.reset();
    }

    login() {
        const creds: ICredentials = this.loginForm.value;
        this.loginEvent.emit(creds);
    }

}
