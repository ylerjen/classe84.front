import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { AppComponent } from './app.component';
import { appRoutes } from './config/router.config';
import { IGlobalState, globalState } from './stores/globalState';
import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notification/notification.service';
import { HomePage } from './pages/home-page/home.page';
import { LoginPage } from './pages/login-page/login.page';
import { AboutPage } from './pages/about-page/about.page';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { NotFoundPage } from './pages/not-found/not-found.page';


@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        AboutPage,
        HeaderComponent,
        FooterComponent,
        LoginPage,
        NotifierComponent,
        LoginFormComponent,
        UnauthorizedPage,
        NotFoundPage,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.provideStore(globalState),
        RouterModule.forRoot(appRoutes),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),  // for redux debug => storeDevtools instrument
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AuthModule,
        EventModule,
        UserModule,
        ContactModule,
    ],
    providers: [
        AppService,
        AuthService,
        NotificationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
