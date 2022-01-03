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
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableExporterModule } from 'mat-table-exporter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppResourceComponent } from './appresource/appresource.component';
import { AppResourceDetailComponent } from './appresource-detail/appresource-detail.component';
import { ApplicationComponent } from './application/application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './jwt.interceptor';
import { LocaleComponent } from './locale/locale.component';
import { LocaleListComponent } from './locale-list/locale-list.component';
import { MatchRequestComponent } from './matchrequest/matchrequest.component';
import { MatchRequestDetailComponent } from './matchrequest-detail/matchrequest-detail.component';
import { MatchRequestDetail2Component } from './matchrequest-detail2/matchrequest-detail2.component';
import { MessagesComponent } from './messages/messages.component';
import { LocaleSearchComponent } from './locale-search/locale-search.component';
import { AppresourceSearchComponent } from './appresource-search/appresource-search.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './register/register.component';
import { AngularMaterialModule } from './angular-material.module';
import { TodoComponent } from './todo/todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClinicalSiteEditableListComponent } from './clinicalsite-editablelist/clinicalsite-editablelist.component';
import { ClinicalTrialDetailComponent } from './clinicaltrial-detail/clinicaltrial-detail.component';
import { ClinicalTrialDetailClinicalSiteComponent } from './clinicaltrial-detail-clinicalsite/clinicaltrial-detail-clinicalsite.component';
import { ClinicalTrialNewComponent } from './clinicaltrial-new/clinicaltrial-new.component';
import { ClinicalTrialNewReviewComponent } from './clinicaltrial-new-review/clinicaltrial-new-review.component';
import { ClinicalTrialQuestionTypeGroupComponent } from './clinicaltrialquestiontype-group/clinicaltrialquestiontype-group.component';
import { DashboardClinicalSiteComponent } from './dashboard-clinicalsite/dashboard-clinicalsite.component';
import { DashboardPhysicianComponent } from './dashboard-physician/dashboard-physician.component';
import { DashboardSponsorComponent } from './dashboard-sponsor/dashboard-sponsor.component';
import { QuestionCriteriaComponent } from './question-criteria/question-criteria.component';
import { QuestionTypeNewComponent } from './questiontype-new/questiontype-new.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { MatTab } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    AppResourceComponent,
    AppResourceDetailComponent,
    ApplicationComponent,
    ClinicalSiteEditableListComponent,
    ClinicalTrialDetailComponent,
    ClinicalTrialDetailClinicalSiteComponent,
    ClinicalTrialNewComponent,
    ClinicalTrialNewReviewComponent,
    ClinicalTrialQuestionTypeGroupComponent,
    DashboardClinicalSiteComponent,
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
    MatchRequestDetail2Component,
    PageNotFoundComponent,
    RegisterComponent,
    TodoComponent,
    DashboardPhysicianComponent,
    DashboardSponsorComponent,
    QuestionCriteriaComponent,
    QuestionTypeNewComponent,
    ApplicationDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTableExporterModule,
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
