import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppResourceComponent } from './appresource/appresource.component';
import { AppResourceDetailComponent } from './appresource-detail/appresource-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './jwt.interceptor';
import { LocaleComponent } from './locale/locale.component';
import { LocaleListComponent } from './locale-list/locale-list.component';
import { MessagesComponent } from './messages/messages.component';
import { LocaleSearchComponent } from './locale-search/locale-search.component';
import { AppresourceSearchComponent } from './appresource-search/appresource-search.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { TodoComponent } from './todo/todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AppResourceComponent,
    AppResourceDetailComponent,
    DashboardComponent,
    LocaleComponent,
    LocaleListComponent,
    MessagesComponent,
    DashboardComponent,
    AppresourceSearchComponent,
    LocaleSearchComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
