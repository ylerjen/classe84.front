import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UUID } from 'angular2-uuid';

import { Login, LoginFactory } from 'app/models/Login';
import { AuthService } from '../../services/auth.service';

/**
 * Login form
 */
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    private _globalErrors: Array<String> = [];
    @Input()
    set globalErrors(errArr: Array<String>) {
        this._globalErrors = Array.isArray(errArr) ? errArr : [];
    }
    get globalErrors() {
        return this._globalErrors;
    }

    @Input() public isProcessing: boolean;

    @Output() public loginEvent = new EventEmitter();

    public compId: string;

    public loginForm: FormGroup;

    constructor(private _fb: FormBuilder, private _authSrvc: AuthService) {}

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
            email: [
                '',
                Validators.compose([Validators.required, Validators.email])
            ],
            password: ['', Validators.required],
            remember: false
        });
    }

    login($event: Event): void {
        $event.preventDefault();

        if (this.loginForm.valid) {
            const creds: Login = LoginFactory.fromObject(this.loginForm.value);
            this.loginEvent.emit(creds);
        } else {
            this.markAsTouched(this.loginForm);
        }
    }

    isArray(obj: any) {
        return Array.isArray(obj);
    }

    /**
     * Mark all element of the formGroup as touched
     * @param formGroup - the form group to set as touched
     */
    private markAsTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markAsTouched(c));
            }
        });
    }
}
