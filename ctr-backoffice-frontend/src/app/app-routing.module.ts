import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocaleListComponent} from './locale-list/locale-list.component';
import {AppResourceComponent} from './appresource/appresource.component';
import {AppResourceDetailComponent} from './appresource-detail/appresource-detail.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ClinicalTrialDetailComponent } from './clinicaltrial-detail/clinicaltrial-detail.component';
import { ClinicalTrialDetailClinicalSiteComponent } from './clinicaltrial-detail-clinicalsite/clinicaltrial-detail-clinicalsite.component';
import { ClinicalTrialNewComponent } from './clinicaltrial-new/clinicaltrial-new.component';
import { ClinicalTrialNewReviewComponent } from './clinicaltrial-new-review/clinicaltrial-new-review.component';
import { ClinicalTrialQuestionTypeGroupComponent } from './clinicaltrialquestiontype-group/clinicaltrialquestiontype-group.component';
import { DashboardClinicalSiteComponent } from './dashboard-clinicalsite/dashboard-clinicalsite.component';
import { DashboardPhysicianComponent } from './dashboard-physician/dashboard-physician.component';
import { DashboardSponsorComponent } from './dashboard-sponsor/dashboard-sponsor.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LocaleComponent} from './locale/locale.component';
import { LoginComponent } from './login/login.component';
import { MatchRequestComponent } from './matchrequest/matchrequest.component';
import { MatchRequestDetailComponent } from './matchrequest-detail/matchrequest-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {path: 'application', component: ApplicationComponent},
  {path: 'application-clinicalsite', component: ApplicationComponent},
  {path: 'application-sponsor', component: ApplicationComponent},
  {path: 'application/:id', component: ApplicationDetailComponent},
  {path: 'appresource', component: AppResourceComponent},
  {path: 'appresource/:id', component: AppResourceDetailComponent},
  {path: 'clinicaltrial', component: ClinicalTrialDetailComponent},
  {path: 'clinicaltrial/:id', component: ClinicalTrialDetailComponent},
  {path: 'clinicaltrial-clinicalsite', component: ClinicalTrialDetailClinicalSiteComponent},
  {path: 'clinicaltrial-edit/:id', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrial-new', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrial-new-flow', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrial-new-flow-start', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrial-new-flow-review', component: ClinicalTrialNewReviewComponent},
  {path: 'clinicaltrialquestiontypegroup-condition/:id', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-condition-flow', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-ghi/:id', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-ghi-flow', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-trial/:id', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-trial-flow', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard-clinicalsite', component: DashboardClinicalSiteComponent},
  {path: 'dashboard-physician', component: DashboardPhysicianComponent},
  {path: 'dashboard-sponsor', component: DashboardSponsorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'locale/:code', component: LocaleComponent},
  {path: 'locales', component: LocaleListComponent},
  {path: 'matchrequest', component: MatchRequestComponent},
  {path: 'matchrequest/:keyssi', component: MatchRequestDetailComponent},
  {path: 'physician', component: TodoComponent},
  {path: 'site', component: TodoComponent},
  {path: 'sponsor', component: TodoComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
