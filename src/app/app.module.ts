import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UserModule } from './modules/user.module';
import { userlistReducer } from './stores/userlistReducer';
import { appRoutes } from './router.config';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home.page';
import { AboutPage } from './pages/about.page';
import { UsersPage } from './pages/users.page';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './components/panel/panel.component';

import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    HeaderComponent,
    FooterComponent,
    PanelComponent,
    UsersPage,
    UsersListComponent,
    UserListItemComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({
      userList: userlistReducer
    }),
    RouterModule.forRoot(appRoutes),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),  // for redux debug => storeDevtools instrument
    FormsModule,
    HttpModule
  ],
  providers: [ UsersService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
