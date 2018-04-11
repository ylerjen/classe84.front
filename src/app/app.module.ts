import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { AppComponent } from './app.component';
import { appRoutes } from './config/router.config';
import { globalState } from './stores/globalState';
import { AppService } from './services/app/app.service';
import { HomePage } from './pages/home-page/home.page';
import { LoginPageComponent } from './pages/login-page/login.page';
import { AboutPage } from './pages/about-page/about.page';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { AppEffects } from './effects/app.effect';
import { SessionEffects } from './effects/session.effect';
import { AddressEffects } from './effects/address.effect';
import { UserEffects } from './effects/user.effect';
import { SubscriptionEffects } from './effects/subscription.effect';
import { EventEffects } from './effects/event.effect';
import { EventlistEffects } from './effects/eventlist.effect';


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
        NotFoundPage,
        LogoutPageComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(globalState),
        RouterModule.forRoot(appRoutes),
        EffectsModule.forRoot([
            AppEffects,
            SessionEffects,
            UserEffects,
            AddressEffects,
            SubscriptionEffects,
            EventlistEffects,
            EventEffects,
        ]),
        StoreDevtoolsModule.instrument({    // for redux debug => storeDevtools instrument
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
          }),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AuthModule,
        EventModule,
        UserModule,
        ContactModule,
        SharedModule,
    ],
    providers: [
        AppService,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
