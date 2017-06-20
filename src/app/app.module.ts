import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { IAppState, appState } from './stores/appState';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { appRoutes } from './config/router.config';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { LoginService } from './services/login/login.service';
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
import { UserViewComponent } from './components/user-view/user-view.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressComponent } from './components/address/address.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { LoginFormComponent } from './components/login-form/login-form.component';



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
        UserViewComponent,
        AddressListComponent,
        AddressComponent,
        NotifierComponent,
        LoginFormComponent,
    ],
    imports: [
        BrowserModule,
        StoreModule.provideStore(appState),
        RouterModule.forRoot(appRoutes),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),  // for redux debug => storeDevtools instrument
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AuthModule
    ],
    providers: [UsersService, LoginService, NotificationService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
