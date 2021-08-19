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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppResourceComponent } from './appresource/appresource.component';
import { AppResourceDetailComponent } from './appresource-detail/appresource-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './jwt.interceptor';
import { LocaleComponent } from './locale/locale.component';
import { LocaleListComponent } from './locale-list/locale-list.component';
import { MatchRequestComponent } from './matchrequest/matchrequest.component';
import { MatchRequestDetailComponent } from './matchrequest-detail/matchrequest-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { LocaleSearchComponent } from './locale-search/locale-search.component';
import { AppresourceSearchComponent } from './appresource-search/appresource-search.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { TodoComponent } from './todo/todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardPhysicianComponent } from './dashboard-physician/dashboard-physician.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TrialdetailComponent } from './trialdetail/trialdetail.component';
import { DashboardSponsorComponent } from './dashboard-sponsor/dashboard-sponsor.component';
import { ClinicaltrialGhiDetailComponent } from './clinicaltrial-ghi-detail/clinicaltrial-ghi-detail.component';
import { QuestionCriteriaComponent } from './question-criteria/question-criteria.component';

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
    MatchRequestComponent,
    MatchRequestDetailComponent,
    PageNotFoundComponent,
    RegisterComponent,
    TodoComponent,
    DashboardPhysicianComponent,
    TrialdetailComponent,
    DashboardSponsorComponent,
    ClinicaltrialGhiDetailComponent,
    QuestionCriteriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: Window, useValue: window },
    AuthService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
