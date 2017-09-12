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

const authRoutes: Routes = [
    { path: 'reset-password', component: PasswordRecoveryComponent },
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
        PasswordRecoveryComponent
    ],
    exports: [
        LoginFormComponent
    ]
})
export class AuthModule { }
