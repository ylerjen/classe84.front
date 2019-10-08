import { NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { AppComponent } from './app.component';
import { globalState } from './stores/globalState';
import { AppService } from './services/app/app.service';
import { AuthService } from './auth/services/auth.service';
import { HomePage } from './pages/home-page/home.page';
import { LoginPageComponent } from './pages/login-page/login.page';
import { AboutPage } from './pages/about-page/about.page';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { AppEffects } from './effects/app.effect';
import { SessionEffects } from './effects/session.effect';
import { AddressEffects } from './effects/address.effect';
import { SubscriptionEffects } from './effects/subscription.effect';
import { NotificationEffects } from './effects/notification.effect';
import { HttpErrorInterceptor } from '@shared/interceptors/http-error.interceptor';
import { NotificationService } from '@shared/services/notification/notification.service';
import { ForbiddenPage } from './pages/forbidden/forbidden.page';
import { ErrorRoutingModule } from './config/error-routing.module';
import { AddressModule } from './address/address.module';


@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        AboutPage,
        HeaderComponent,
        FooterComponent,
        LoginPageComponent,
        NotifierComponent,
        UnauthorizedPage,
        LogoutPageComponent,
        ForbiddenPage,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(globalState),
        AppRoutingModule,
        EffectsModule.forRoot([
            AppEffects,
            NotificationEffects,
            SessionEffects,
            AddressEffects,
            SubscriptionEffects,
        ]),
        // for redux debug => storeDevtools instrument
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
          }),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AuthModule,
        EventModule,
        UserModule,
        AddressModule,
        ContactModule,
        SharedModule,
        ErrorRoutingModule
    ],
    providers: [
        AppService,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
          deps: [ Router, ActivatedRoute, NotificationService ]
        }
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
