import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { IGlobalState, globalState } from './stores/globalState';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { appRoutes } from './config/router.config';
import { AppService } from './services/app/app.service';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { NotificationService } from './services/notification/notification.service';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home-page/home.page';
import { AboutPage } from './pages/about-page/about.page';
import { UsersPage } from './pages/userlist-page/users.page';
import { UserPage } from './pages/user-page/user.page';
import { LoginPage } from './pages/login-page/login.page';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './components/panel/panel.component';
import { UserListFilterComponent } from './components/user-list-filter/user-list-filter.component';
import { UserListWrapperComponent } from './components/user-list-wrapper/user-list-wrapper.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressComponent } from './components/address/address.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailViewerComponent } from './components/user-detail-viewer/user-detail-viewer.component';
import { UserFormViewerComponent } from './components/user-form-viewer/user-form-viewer.component';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { PhoneNbPipe } from './pipes/phone-nb.pipe';



@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        AboutPage,
        HeaderComponent,
        FooterComponent,
        PanelComponent,
        UsersPage,
        UserPage,
        LoginPage,
        UsersListComponent,
        UserListItemComponent,
        UserListFilterComponent,
        UserListWrapperComponent,
        AddressListComponent,
        AddressComponent,
        NotifierComponent,
        LoginFormComponent,
        UserFormComponent,
        ValidationErrorComponent,
        UserDetailComponent,
        UserDetailViewerComponent,
        UserFormViewerComponent,
        UnauthorizedPage,
        NotFoundPage,
        PhoneNbPipe,
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
        AuthModule
    ],
    providers: [
        AppService,
        AuthService,
        NotificationService,
        UsersService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
