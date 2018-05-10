import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

import { Login, LoginFactory } from 'app/models/Login';
import { AuthService } from '../services/auth.service';

/**
 * Login form
 */
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    @Input()
    public isProcessing: boolean;

    @Output()
    public loginEvent = new EventEmitter();

    public compId: string;

    public loginForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _authSrvc: AuthService,
    ) { }

    ngOnInit(): void {
        this.createForm();
        this.compId = UUID.UUID();
        const creds = this._authSrvc.getRememberedCreds();
        if (creds && creds.email && creds.password) {
            this.loginForm.setValue(creds);
        }
    }

    createForm(): void {
        this.loginForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            remember: false
        });
    }

    resetForm(): void {
        this.loginForm.reset();
    }

    login(): void {
        if (this.loginForm.valid) {
            const creds: Login = LoginFactory.fromObject(this.loginForm.value);
            this.loginEvent.emit(creds);
        }
    }

}
