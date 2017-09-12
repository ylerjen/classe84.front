import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { authHttpServiceFactory } from '../services/auth/auth.service';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

export const ROUTE = {
    passwordRecovery: 'password-recovery',
    restorePassword: 'restore-password',
    changePassword: 'change-password'
}
export const RECOVERY_TOKEN_VAR_NAME = '${token}';
export const RECOVERY_TOKEN_PARAM_NAME = 'recoveryToken';

const authRoutes: Routes = [
    { path: ROUTE.passwordRecovery, component: PasswordRecoveryComponent },
    { path: ROUTE.restorePassword, component: RestorePasswordComponent },
    { path: ROUTE.changePassword, component: ChangePasswordComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        SharedModule,
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ],
    declarations: [
        LoginFormComponent,
        PasswordRecoveryComponent,
        ChangePasswordComponent,
        RestorePasswordComponent
    ],
    exports: [
        LoginFormComponent
    ]
})
export class AuthModule { }
