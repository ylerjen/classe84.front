import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { authHttpServiceFactory } from '../services/auth/auth.service';
import { AccountRecoveryFormComponent } from './account-recovery/account-recovery-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { LoginFormViewerComponent } from './login-form-viewer/login-form-viewer.component';
import { AccountRecoveryViewerComponent } from './account-recovery-viewer/account-recovery-viewer.component';
import { PasswordConfirmFormComponent } from './password-confirm-form/password-confirm-form.component';

export const ROUTE = {
    restorePassword: 'restore-password',
    changePassword: 'change-password'
};
export const RECOVERY_TOKEN_VAR_NAME = '${token}';
export const RECOVERY_TOKEN_PARAM_NAME = 'recoveryToken';

const authRoutes: Routes = [
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
        AccountRecoveryFormComponent,
        ChangePasswordComponent,
        RestorePasswordComponent,
        LoginFormViewerComponent,
        AccountRecoveryViewerComponent,
        PasswordConfirmFormComponent,
    ],
    exports: [
        LoginFormComponent,
        AccountRecoveryFormComponent,
        LoginFormViewerComponent,
        AccountRecoveryViewerComponent,
    ]
})
export class AuthModule { }
