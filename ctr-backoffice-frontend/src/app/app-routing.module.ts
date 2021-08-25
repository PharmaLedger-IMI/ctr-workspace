import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocaleListComponent} from './locale-list/locale-list.component';
import {AppResourceComponent} from './appresource/appresource.component';
import {AppResourceDetailComponent} from './appresource-detail/appresource-detail.component';
import { ClinicalTrialNewComponent } from './clinicaltrial-new/clinicaltrial-new.component';
import { ClinicalTrialQuestionTypeGroupComponent } from './clinicaltrialquestiontype-group/clinicaltrialquestiontype-group.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LocaleComponent} from './locale/locale.component';
import { LoginComponent } from './login/login.component';
import { MatchRequestComponent } from './matchrequest/matchrequest.component';
import { MatchRequestDetailComponent } from './matchrequest-detail/matchrequest-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TodoComponent } from './todo/todo.component';
import { DashboardPhysicianComponent } from './dashboard-physician/dashboard-physician.component';
import { DashboardSponsorComponent } from './dashboard-sponsor/dashboard-sponsor.component';
import { TrialdetailComponent } from './trialdetail/trialdetail.component';

const routes: Routes = [
  {path: 'appresource', component: AppResourceComponent},
  {path: 'appresource/:id', component: AppResourceDetailComponent},
  {path: 'clinicaltrial-edit/:id', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrial-new', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrial-new-flow', component: ClinicalTrialNewComponent},
  {path: 'clinicaltrialquestiontypegroup-condition/:id', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-condition-flow', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-ghi/:id', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-ghi-flow', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-trial/:id', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'clinicaltrialquestiontypegroup-trial-flow', component: ClinicalTrialQuestionTypeGroupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'locale/:code', component: LocaleComponent},
  {path: 'locales', component: LocaleListComponent},
  {path: 'matchrequest', component: MatchRequestComponent},
  {path: 'matchrequest/:keyssi', component: MatchRequestDetailComponent},
  {path: 'physician', component: TodoComponent},
  {path: 'site', component: TodoComponent},
  {path: 'sponsor', component: TodoComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard-physician', component: DashboardPhysicianComponent},
  {path: 'dashboard-sponsor', component: DashboardSponsorComponent},
  {path: 'trialdetails', component: TrialdetailComponent},
  {path: 'trialdetails/:id', component: TrialdetailComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
