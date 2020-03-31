import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from 'app/pages/login-page/login.page';
import { LogoutPageComponent } from 'app/pages/logout-page/logout-page.component';
import { ForbiddenPage } from 'app/pages/forbidden/forbidden.page';
import { UnauthorizedPage } from 'app/pages/unauthorized/unauthorized.page';

@NgModule({
    imports: [
        AuthRoutingModule,
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
        LoginFormViewerComponent,
        AccountRecoveryViewerComponent,
        PasswordConfirmFormComponent,
        LoginPageComponent,
        LogoutPageComponent,
        ForbiddenPage,
        UnauthorizedPage,
        ChangePasswordComponent,
        RestorePasswordComponent,
    ],
    exports: [
        LoginFormComponent,
        AccountRecoveryFormComponent,
        LoginFormViewerComponent,
        AccountRecoveryViewerComponent
    ]
})
export class AuthModule {}
