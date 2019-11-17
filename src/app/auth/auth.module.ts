import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { AccountRecoveryFormComponent } from './components/account-recovery/account-recovery-form.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { LoginFormViewerComponent } from './components/login-form-viewer/login-form-viewer.component';
import { AccountRecoveryViewerComponent } from './components/account-recovery-viewer/account-recovery-viewer.component';
import { PasswordConfirmFormComponent } from './components/password-confirm-form/password-confirm-form.component';
import { ROUTE } from './auth-route.config';
import { StoreModule } from '@ngrx/store';
import { sessionReducer, sessionFeatureKey } from './state/reducers/session.reducer';

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
        StoreModule.forFeature(sessionFeatureKey, sessionReducer),
        JwtModule.forRoot({
            config: {
                tokenGetter: AuthService.getSessionToken,
                skipWhenExpired: false,
                whitelistedDomains: ['api84.loc', 'api.classe84.org']
                // blacklistedRoutes: ['localhost:3001/auth/']
            }
        }),

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
