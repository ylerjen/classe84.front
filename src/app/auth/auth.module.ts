import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { AccountRecoveryFormComponent } from './account-recovery/account-recovery-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { LoginFormViewerComponent } from './login-form-viewer/login-form-viewer.component';
import { AccountRecoveryViewerComponent } from './account-recovery-viewer/account-recovery-viewer.component';
import { PasswordConfirmFormComponent } from './password-confirm-form/password-confirm-form.component';
import { ROUTE } from './auth-route.config';

export const authRoutes: Routes = [
    { path: ROUTE.restorePassword, component: RestorePasswordComponent },
    { path: ROUTE.changePassword, component: ChangePasswordComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: AuthService.getSessionToken,
                skipWhenExpired: false,
                whitelistedDomains: ['api84.loc', 'api.classe84.org']
                // blacklistedRoutes: ['localhost:3001/auth/']
            }
        })
    ],
    providers: [],
    declarations: [
        LoginFormComponent,
        AccountRecoveryFormComponent,
        ChangePasswordComponent,
        RestorePasswordComponent,
        LoginFormViewerComponent,
        AccountRecoveryViewerComponent,
        PasswordConfirmFormComponent
    ],
    exports: [
        LoginFormComponent,
        AccountRecoveryFormComponent,
        LoginFormViewerComponent,
        AccountRecoveryViewerComponent
    ]
})
export class AuthModule {}
